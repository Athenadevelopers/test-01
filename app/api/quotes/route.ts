import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Prepare email content
    const emailContent = `
New Quote Request Received

Company Information:
- Company: ${formData.companyName}
- Contact: ${formData.contactName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Service Type: ${formData.serviceType}
- Shipment Direction: ${formData.shipmentType}

Cargo Details:
${formData.cargoItems.map((item: any, index: number) => `
Item ${index + 1}:
- Description: ${item.description}
- HS Code: ${item.hsCode}
- Quantity: ${item.quantity} ${item.unit}
- Weight: ${item.weight} kg
- Dimensions: ${item.length} x ${item.width} x ${item.height} cm
- Value: ${item.value} ${item.currency}
`).join('')}

Shipping Route:
- Origin: ${formData.originCountry} - ${formData.originPort}
- Destination: ${formData.destinationCountry} - ${formData.destinationPort}
- Shipment Terms: ${formData.incoterms}
- T/S Port (Origin): ${formData.originTranshipmentPort || 'N/A'}
- T/S Port (Destination): ${formData.destinationTranshipmentPort || 'N/A'}

Services & Timing:
- Preferred Departure: ${formData.preferredDeparture || 'Flexible'}
- Delivery Urgency: ${formData.deliveryUrgency || 'Not specified'}
- Additional Services: ${formData.additionalServices.join(', ') || 'None'}
- Special Requirements: ${formData.specialRequirements || 'None'}

Additional Comments: ${formData.comments || 'None'}

Submitted on: ${new Date().toLocaleString()}
    `;

    // Send email to your company
    const { data, error } = await resend.emails.send({
      from: 'quotes@yourdomain.com', // Replace with your verified domain
      to: ['quotes@globalshiplogistics.com'], // Replace with your email
      subject: `New Quote Request - ${formData.companyName}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Quote Request Received
          </h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Company Information</h3>
            <p><strong>Company:</strong> ${formData.companyName}</p>
            <p><strong>Contact:</strong> ${formData.contactName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Service Type:</strong> ${formData.serviceType}</p>
            <p><strong>Shipment Direction:</strong> ${formData.shipmentType}</p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Cargo Details</h3>
            ${formData.cargoItems.map((item: any, index: number) => `
              <div style="border: 1px solid #d1d5db; padding: 15px; margin: 10px 0; border-radius: 4px;">
                <h4 style="color: #374151; margin-top: 0;">Item ${index + 1}</h4>
                <p><strong>Description:</strong> ${item.description}</p>
                <p><strong>HS Code:</strong> ${item.hsCode}</p>
                <p><strong>Quantity:</strong> ${item.quantity} ${item.unit}</p>
                <p><strong>Weight:</strong> ${item.weight} kg</p>
                <p><strong>Dimensions:</strong> ${item.length} x ${item.width} x ${item.height} cm</p>
                <p><strong>Value:</strong> ${item.value} ${item.currency}</p>
              </div>
            `).join('')}
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Shipping Route</h3>
            <p><strong>Origin:</strong> ${formData.originCountry} - ${formData.originPort}</p>
            <p><strong>Destination:</strong> ${formData.destinationCountry} - ${formData.destinationPort}</p>
            <p><strong>Shipment Terms:</strong> ${formData.incoterms}</p>
            <p><strong>T/S Port (Origin):</strong> ${formData.originTranshipmentPort || 'N/A'}</p>
            <p><strong>T/S Port (Destination):</strong> ${formData.destinationTranshipmentPort || 'N/A'}</p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Services & Timing</h3>
            <p><strong>Preferred Departure:</strong> ${formData.preferredDeparture || 'Flexible'}</p>
            <p><strong>Delivery Urgency:</strong> ${formData.deliveryUrgency || 'Not specified'}</p>
            <p><strong>Additional Services:</strong> ${formData.additionalServices.join(', ') || 'None'}</p>
            <p><strong>Special Requirements:</strong> ${formData.specialRequirements || 'None'}</p>
          </div>

          ${formData.comments ? `
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Additional Comments</h3>
              <p>${formData.comments}</p>
            </div>
          ` : ''}

          <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; color: #1e40af; font-weight: 500;">
              <strong>Submitted on:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Email sending failed:', error);
      return NextResponse.json(
        { error: 'Failed to send email notification' },
        { status: 500 }
      );
    }

    // Send confirmation email to customer
    const customerEmailContent = `
Dear ${formData.contactName},

Thank you for submitting your quote request to GlobalShip Logistics.

We have received your shipping quote request with the following details:

Service Type: ${formData.serviceType}
Shipment Direction: ${formData.shipmentType}
Origin: ${formData.originCountry} - ${formData.originPort}
Destination: ${formData.destinationCountry} - ${formData.destinationPort}

Our logistics experts will review your requirements and provide you with a detailed quote within 24 hours.

If you have any urgent questions, please don't hesitate to contact us directly.

Best regards,
GlobalShip Logistics Team
    `;

    await resend.emails.send({
      from: 'quotes@yourdomain.com', // Replace with your verified domain
      to: [formData.email],
      subject: 'Quote Request Received - GlobalShip Logistics',
      text: customerEmailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            Quote Request Received
          </h2>
          
          <p>Dear ${formData.contactName},</p>
          
          <p>Thank you for submitting your quote request to <strong>GlobalShip Logistics</strong>.</p>
          
          <p>We have received your shipping quote request with the following details:</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Service Type:</strong> ${formData.serviceType}</p>
            <p><strong>Shipment Direction:</strong> ${formData.shipmentType}</p>
            <p><strong>Origin:</strong> ${formData.originCountry} - ${formData.originPort}</p>
            <p><strong>Destination:</strong> ${formData.destinationCountry} - ${formData.destinationPort}</p>
          </div>
          
          <p>Our logistics experts will review your requirements and provide you with a detailed quote within <strong>24 hours</strong>.</p>
          
          <p>If you have any urgent questions, please don't hesitate to contact us directly.</p>
          
          <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af;">
              <strong>Best regards,</strong><br>
              GlobalShip Logistics Team
            </p>
          </div>
        </div>
      `
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Quote request submitted successfully',
        emailId: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 