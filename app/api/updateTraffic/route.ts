import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Write the updated data to the JSON file
    await writeFile(
      path.join(process.cwd(), 'public', 'traffic.json'),
      JSON.stringify(data, null, 2)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update traffic stats:', error);
    return NextResponse.json(
      { error: 'Failed to update traffic statistics' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST to update traffic stats' });
}