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

    // Simulate realistic seat availability patterns
    const TOTAL_SEATS = 100;
    const availability: Record<string, { available: number; total: number }> = {};

    windows.forEach((window, index) => {
      // Calculate booked seats based on deterministic patterns
      let bookedSeats = 0;

      // Weekends check (0 = Sunday, 6 = Saturday)
      if (region === "USA" || region === "Europe") {
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          bookedSeats = TOTAL_SEATS; // Fully booked (no demos on weekends)
        }
      }

      if (region === "Middle East" && (dayOfWeek === 5 || dayOfWeek === 6)) {
        bookedSeats = TOTAL_SEATS; // Friday/Saturday off for Middle East
      }

      if (region === "India" && dayOfWeek === 0) {
        bookedSeats = TOTAL_SEATS; // Sunday off for India
      }

      // Simulate varying booking levels for available days
      if (bookedSeats < TOTAL_SEATS) {
        // Morning slots (index 0) - typically 40-70% booked
        if (index === 0) {
          bookedSeats = 40 + ((dayOfMonth * 3 + dayOfWeek) % 31);
        }

        // Afternoon slots (index 1) - typically 50-80% booked (more popular)
        if (index === 1) {
          bookedSeats = 50 + ((dayOfMonth * 5 + dayOfWeek * 2) % 31);
        }

        // Late slots (index 2) - typically 30-60% booked
        if (index === 2) {
          bookedSeats = 30 + ((dayOfMonth * 2 + dayOfWeek) % 31);
        }

        // Add some variation based on day of week
        if (dayOfWeek === 1) bookedSeats += 10; // Mondays busier
        if (dayOfWeek === 5) bookedSeats += 5;  // Fridays slightly busier
        if (dayOfWeek === 2) bookedSeats -= 5;  // Tuesdays quieter

        // Ensure bookings don't exceed total or go negative
        bookedSeats = Math.max(0, Math.min(TOTAL_SEATS, bookedSeats));
      }

      const availableSeats = TOTAL_SEATS - bookedSeats;

      availability[window] = {
        available: availableSeats,
        total: TOTAL_SEATS
      };
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
