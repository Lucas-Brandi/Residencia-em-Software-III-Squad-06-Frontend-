import * as React from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DateRangePickerProps {
  value: DateRange | undefined
  onChange: (range: DateRange | undefined) => void
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center gap-2 border-border bg-transparent text-sm text-foreground hover:bg-white/5",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon size={14} />
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, "MMM dd, yyyy", { locale: ptBR })}
                {" - "}
                {format(value.to, "MMM dd, yyyy", { locale: ptBR })}
              </>
            ) : (
              format(value.from, "MMM dd, yyyy", { locale: ptBR })
            )
          ) : (
            "Selecione um período"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-border" style={{ backgroundColor: "#414F5A" }}align="end"
>
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          locale={ptBR}
          showOutsideDays={false}
        />
      </PopoverContent>
    </Popover>
  )
}