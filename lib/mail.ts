import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Notifica a los administradores que se ha creado una nueva landing
 */
export async function notifyAdminNewLanding(data: {
    partnerName: string;
    landingSlug: string;
    landingType: string;
    adminEmails: string[];
}) {
    if (!process.env.RESEND_API_KEY || data.adminEmails.length === 0) return;

    try {
        console.log('Resend: Sending email to admins...', data.adminEmails);
        const res = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: data.adminEmails,
            subject: `🔔 Nueva Landing Pendiente: ${data.landingSlug}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #865BFF;">Nueva Solicitud de Revisión</h2>
                    <p>El socio <strong>${data.partnerName}</strong> ha generado una nueva landing page.</p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 5px 0;"><strong>Slug:</strong> ${data.landingSlug}</p>
                        <p style="margin: 5px 0;"><strong>Tipo:</strong> ${data.landingType}</p>
                    </div>
                    <p>Por favor, revisa y aprueba esta landing desde el panel de administración.</p>
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard/admin/landings" 
                       style="display: inline-block; padding: 10px 20px; background: #865BFF; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Ir al Panel Admin
                    </a>
                </div>
            `
        });
        console.log('Resend Response:', res);
    } catch (error) {
        console.error('Error sending admin notification email:', error);
    }
}

/**
 * Notifica al socio sobre el cambio de estado de su landing
 */
export async function notifyPartnerStatusUpdate(data: {
    partnerEmail: string;
    partnerName: string;
    landingSlug: string;
    status: 'approved' | 'rejected';
    adminNotes?: string;
}) {
    if (!process.env.RESEND_API_KEY || !data.partnerEmail) return;

    const isApproved = data.status === 'approved';
    const subject = isApproved 
        ? `✅ ¡Tu Landing ha sido Aprobada! - ${data.landingSlug}`
        : `❌ Actualización requerida en tu Landing - ${data.landingSlug}`;

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: [data.partnerEmail],
            subject: subject,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                    <h2 style="color: ${isApproved ? '#10b981' : '#f43f5e'};">
                        ${isApproved ? '¡Felicidades!' : 'Revisión Necesaria'}
                    </h2>
                    <p>Hola <strong>${data.partnerName}</strong>,</p>
                    <p>Tenemos noticias sobre tu solicitud de landing page <strong>${data.landingSlug}</strong>.</p>
                    
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${isApproved ? '#10b981' : '#f43f5e'};">
                        <p style="margin: 5px 0;"><strong>Estado:</strong> ${isApproved ? 'APROBADA' : 'RECHAZADA'}</p>
                        ${!isApproved && data.adminNotes ? `<p style="margin: 5px 0;"><strong>Notas del Admin:</strong> ${data.adminNotes}</p>` : ''}
                    </div>

                    ${isApproved ? `
                        <p>Tu landing ya es pública y puedes empezar a compartirla para captar leads.</p>
                        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/l/${data.landingSlug}" 
                           style="display: inline-block; padding: 10px 20px; background: #10b981; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                            Ver Landing en Vivo
                        </a>
                    ` : `
                        <p>Por favor, revisa las notas del administrador y realiza los cambios necesarios en el generador.</p>
                        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard/promo/overview" 
                           style="display: inline-block; padding: 10px 20px; background: #f43f5e; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                            Volver al Panel
                        </a>
                    `}
                    
                    <p style="margin-top: 30px; font-size: 12px; color: #999;">
                        Este es un correo automático de Bridge Markets. Por favor no respondas a este mensaje.
                    </p>
                </div>
            `
        });
    } catch (error) {
        console.error('Error sending partner notification email:', error);
    }
}
