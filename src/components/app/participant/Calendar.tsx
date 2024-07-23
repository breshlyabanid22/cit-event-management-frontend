import { Calendar, Card } from "@nextui-org/react";

export default function CalendarComponent() {
    return (
        <Card className="h-[300px]">
            <Calendar
                aria-label="Date (Show Month and Year Picker)"
                showMonthAndYearPickers
            />
        </Card>
    );
}
