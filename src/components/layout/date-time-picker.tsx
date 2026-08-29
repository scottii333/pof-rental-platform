"use client";

import { useState } from "react";

import { CLOSING_HOUR, OPENING_HOUR, isOperatingDay } from "@/shared/search";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MONTHS_SHORT = MONTHS.map((m) => m.slice(0, 3));
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
// bookable time slots within branch opening hours
const HOURS = Array.from(
  { length: CLOSING_HOUR - OPENING_HOUR + 1 },
  (_, i) => i + OPENING_HOUR,
);

const formatHour = (h: number) => `${String(h).padStart(2, "0")}:00`;

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const withHour = (day: Date, hour: number) => {
  const dt = new Date(day);
  dt.setHours(hour, 0, 0, 0);
  return dt;
};

export const formatDateTime = (date: Date, hour: number) =>
  `${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} · ${formatHour(
    hour,
  )}`;

type Props = {
  /** Earliest selectable moment (day + time). */
  minDateTime?: Date;
  /** Latest selectable moment (day + time). */
  maxDateTime?: Date;
  /** Currently chosen value — restores the active day/time when reopened. */
  value?: Date;
  onSelect: (display: string, date: Date) => void;
};

const DateTimePicker = ({
  minDateTime,
  maxDateTime,
  value,
  onSelect,
}: Props) => {
  const min = minDateTime ?? new Date();
  const minDay = startOfDay(min);
  const maxDay = maxDateTime ? startOfDay(maxDateTime) : null;

  const anchor = value ?? min;
  const [viewYear, setViewYear] = useState(anchor.getFullYear());
  const [viewMonth, setViewMonth] = useState(anchor.getMonth());
  const [selectedDay, setSelectedDay] = useState<Date | null>(
    value ? startOfDay(value) : null,
  );
  const selectedHour = value ? value.getHours() : null;

  const firstDow = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++)
    cells.push(new Date(viewYear, viewMonth, d));

  const canGoPrev =
    viewYear > minDay.getFullYear() ||
    (viewYear === minDay.getFullYear() && viewMonth > minDay.getMonth());
  const canGoNext =
    !maxDay ||
    viewYear < maxDay.getFullYear() ||
    (viewYear === maxDay.getFullYear() && viewMonth < maxDay.getMonth());

  const shiftMonth = (delta: number) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewYear(y);
    setViewMonth(m);
  };

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isDayDisabled = (day: Date) =>
    day < minDay ||
    (maxDay !== null && day > maxDay) ||
    !isOperatingDay(withHour(day, 12));

  const isHourDisabled = (day: Date, hour: number) => {
    const at = withHour(day, hour);
    if (at < min) return true;
    if (maxDateTime && at > maxDateTime) return true;
    return false;
  };

  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
      {/* calendar */}
      <div className="min-w-60">
        <div className="mb-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => canGoPrev && shiftMonth(-1)}
            disabled={!canGoPrev}
            aria-label="Previous month"
            className="flex h-7 w-7 items-center justify-center rounded-md text-sm transition-colors hover:bg-black/5 disabled:opacity-30"
          >
            &#8249;
          </button>
          <span className="text-sm font-semibold">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            type="button"
            onClick={() => canGoNext && shiftMonth(1)}
            disabled={!canGoNext}
            aria-label="Next month"
            className="flex h-7 w-7 items-center justify-center rounded-md text-sm transition-colors hover:bg-black/5 disabled:opacity-30"
          >
            &#8250;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((w) => (
            <span
              key={w}
              className="py-1 text-[11px] font-semibold text-muted-foreground"
            >
              {w}
            </span>
          ))}
          {cells.map((day, i) => {
            if (!day) return <span key={`e${i}`} />;
            const disabled = isDayDisabled(day);
            const selected = selectedDay && isSameDay(day, selectedDay);
            return (
              <button
                key={day.toISOString()}
                type="button"
                disabled={disabled}
                onClick={() => setSelectedDay(day)}
                className={`flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors ${
                  selected
                    ? "bg-[#b0894f] font-semibold text-white"
                    : disabled
                      ? "text-muted-foreground/40"
                      : "text-black hover:bg-black/5"
                }`}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* time list */}
      <div className="sm:border-l sm:border-black/10 sm:pl-4">
        <p className="mb-2 text-xs font-semibold text-muted-foreground">
          Select time
        </p>
        <div className="grid max-h-56 grid-cols-3 gap-1 overflow-y-auto pr-1 sm:grid-cols-2">
          {HOURS.map((h) => {
            const disabled = !selectedDay || isHourDisabled(selectedDay, h);
            const active =
              selectedHour === h &&
              selectedDay !== null &&
              value !== undefined &&
              isSameDay(selectedDay, startOfDay(value));
            return (
              <button
                key={h}
                type="button"
                disabled={disabled}
                onClick={() =>
                  selectedDay &&
                  onSelect(
                    formatDateTime(selectedDay, h),
                    withHour(selectedDay, h),
                  )
                }
                className={`rounded-md border px-2 py-1.5 text-xs transition-colors disabled:opacity-40 disabled:hover:border-black/10 disabled:hover:bg-transparent ${
                  active
                    ? "border-[#b0894f] bg-[#b0894f] font-semibold text-white"
                    : "border-black/10 text-black hover:border-[#b0894f] hover:bg-black/5"
                }`}
              >
                {formatHour(h)}
              </button>
            );
          })}
        </div>
        {!selectedDay && (
          <p className="mt-2 text-[11px] text-muted-foreground">
            Pick a day first
          </p>
        )}
      </div>
    </div>
  );
};

export default DateTimePicker;
