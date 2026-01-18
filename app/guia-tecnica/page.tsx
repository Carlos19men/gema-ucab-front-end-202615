import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Guía de ubicaciones técnicas - GEMA',
    description: 'Guía detallada sobre ubicaciones técnicas en GEMA',
};

export default function GuiaTecnicaPage() {
    return (
        <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
            <iframe
                src="/assets/guia-ubicaciones-tecnicas.pdf"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title="Guía de ubicaciones técnicas"
            />
        </div>
    );
}
