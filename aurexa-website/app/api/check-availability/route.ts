import { NextRequest, NextResponse } from "next/server";

// Helper function to get day abbreviation
function getDayAbbr(date: Date): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

// Simulates a booking system - in production, this would query a real database
// For demo purposes, we mark some slots as unavailable based on date logic
export async function POST(req: NextRequest) {
  try {
    const { date, region } = await req.json();

    if (!date || !region) {
      return NextResponse.json(
        { error: "Date and region are required" },
        { status: 400 }
      );
    }

    // Simulate checking a booking database
    // Create a deterministic "random" availability based on date
    // Parse date string as YYYY-MM-DD to avoid timezone issues
    const [year, month, day] = date.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const dayOfMonth = dateObj.getDate();
    const dayOfWeek = dateObj.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dayAbbr = getDayAbbr(dateObj);

    // Define time window templates for each region (without day prefix)
    const regionWindowTemplates: Record<string, Array<{ time: string; timezone: string }>> = {
      "USA": [
        { time: "09:00 – 10:00", timezone: "CT" },
        { time: "14:00 – 15:00", timezone: "CT" },
        { time: "16:00 – 17:00", timezone: "CT" }
      ],
      "Europe": [
        { time: "09:00 – 10:00", timezone: "GMT" },
        { time: "13:00 – 14:00", timezone: "GMT" },
        { time: "15:00 – 16:00", timezone: "GMT" }
      ],
      "Middle East": [
        { time: "10:00 – 11:00", timezone: "GST" },
        { time: "13:00 – 14:00", timezone: "GST" },
        { time: "15:00 – 16:00", timezone: "GST" }
      ],
      "India": [
        { time: "10:00 – 11:00", timezone: "IST" },
        { time: "14:00 – 15:00", timezone: "IST" },
        { time: "16:00 – 17:00", timezone: "IST" }
      ],
    };

    const templates = regionWindowTemplates[region] || regionWindowTemplates["USA"];
    
    // Generate windows with the actual day abbreviation
    const windows = templates.map(t => `${dayAbbr}  ${t.time} ${t.timezone}`);

    // Simulate realistic availability patterns
    const availability: Record<string, boolean> = {};

    windows.forEach((window, index) => {
      // Logic to mark some slots as booked:
      // - Morning slots (index 0) are often booked on Mondays and Fridays
      // - Afternoon slots more likely booked mid-week
      // - Some randomness based on day of month
      
      let isAvailable = true;

      // Weekends check (0 = Sunday, 6 = Saturday)
      if (region === "USA" || region === "Europe") {
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          isAvailable = false; // No demos on weekends for these regions
        }
      }

      if (region === "Middle East" && (dayOfWeek === 5 || dayOfWeek === 6)) {
        isAvailable = false; // Friday/Saturday off for Middle East
      }

      if (region === "India" && dayOfWeek === 0) {
        isAvailable = false; // Sunday off for India
      }

      // Simulate some slots being booked (deterministic based on date)
      if (isAvailable) {
        // Morning slots more likely booked on Mondays (dayOfWeek === 1)
        if (index === 0 && dayOfWeek === 1 && dayOfMonth % 2 === 0) {
          isAvailable = false;
        }

        // Afternoon slots more likely booked on Wednesdays (dayOfWeek === 3)
        if (index === 1 && dayOfWeek === 3 && dayOfMonth % 3 === 0) {
          isAvailable = false;
        }

        // Late slots sometimes booked on Thursdays (dayOfWeek === 4)
        if (index === 2 && dayOfWeek === 4 && dayOfMonth % 2 === 1) {
          isAvailable = false;
        }

        // Some random unavailability based on day of month
        if ((dayOfMonth + index) % 5 === 0) {
          isAvailable = false;
        }
      }

      availability[window] = isAvailable;
    });

    // Simulate network delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      date,
      region,
      windows,
      availability,
    });
  } catch (error) {
    console.error("Availability check error:", error);
    return NextResponse.json(
      { error: "Failed to check availability" },
      { status: 500 }
    );
  }
}
