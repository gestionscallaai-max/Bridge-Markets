import fs from 'fs';
import path from 'path';

const renderersDir = path.resolve(process.cwd(), 'lib/landing/renderers');

function processFile(filename, replacements) {
    const filePath = path.join(renderersDir, filename);
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filename}`);
        return;
    }
    let code = fs.readFileSync(filePath, 'utf8');
    let modified = 0;

    replacements.forEach(({ search, replace }) => {
        if (typeof search === 'string') {
            if (code.includes(search)) {
                code = code.replace(search, replace);
                modified++;
            }
        } else if (search instanceof RegExp) {
            if (search.test(code)) {
                code = code.replace(search, replace);
                modified++;
            }
        }
    });

    fs.writeFileSync(filePath, code, 'utf8');
    console.log(`✅ Updated ${filename}: ${modified} replacements applied.`);
}

// 1. propFirm.ts
processFile('propFirm.ts', [
    {
        search: `Bridge Markets <span class="text-gradient-gold">PropFirm</span> — FOREX/CFDs & Synthetic PropTrading`,
        replace: `\${content.title || 'Bridge Markets <span class="text-gradient-gold">PropFirm</span> — FOREX/CFDs & Synthetic PropTrading'}`
    },
    {
        search: `<span class="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em] mb-4 block italic">El Modelo de Éxito</span>`,
        replace: `<span class="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em] mb-4 block italic">\${content.tag || 'MODELO DE NEGOCIO'}</span>`
    },
    {
        search: `<h2 class="text-4xl md:text-6xl font-black font-headline text-white mb-8 leading-[1.1] uppercase italic">Tú pones el talento. <br>Nosotros el capital.</h2>`,
        replace: `<h2 class="text-4xl md:text-6xl font-black font-headline text-white mb-8 leading-[1.1] uppercase italic">\${content.title || 'Tú pones el talento. <br>Nosotros el capital.'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-4 uppercase tracking-tight italic">FOREX / CFDs PropTrading — Mercados Reales Internacionales</h2>`,
        replace: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-4 uppercase tracking-tight italic">\${content.title || 'FOREX / CFDs PropTrading — Mercados Reales Internacionales'}</h2>`
    },
    {
        search: `<p class="text-white/40 font-medium uppercase tracking-[0.2em] text-xs italic">Opera Forex, índices, commodities y más bajo estándares institucionales.</p>`,
        replace: `<p class="text-white/40 font-medium uppercase tracking-[0.2em] text-xs italic">\${content.desc || 'Opera Forex, índices, commodities y más bajo estándares institucionales.'}</p>`
    },
    {
        search: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-4 uppercase tracking-tight italic">Synthetic PropTrading — Índices Sintéticos 24/7</h2>`,
        replace: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-4 uppercase tracking-tight italic">\${content.title || 'Synthetic PropTrading — Índices Sintéticos 24/7'}</h2>`
    },
    {
        search: `<p class="text-white/40 font-medium uppercase tracking-[0.2em] text-xs italic">Opera BullX500, índices sintéticos y más, disponibles los 7 días de la semana.</p>`,
        replace: `<p class="text-white/40 font-medium uppercase tracking-[0.2em] text-xs italic">\${content.desc || 'Opera BullX500, índices sintéticos y más, disponibles los 7 días de la semana.'}</p>`
    },
    {
        search: `<span class="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-4 block italic">El Camino al Éxito</span>`,
        replace: `<span class="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-4 block italic">\${content.tag || 'PASO A PASO'}</span>`
    },
    {
        search: `<h2 class="text-4xl md:text-6xl font-black font-headline text-white uppercase italic">Proceso Paso a Paso</h2>`,
        replace: `<h2 class="text-4xl md:text-6xl font-black font-headline text-white uppercase italic">\${content.title || 'Proceso Paso a Paso'}</h2>`
    },
    {
        search: `<h2 class="text-4xl md:text-6xl font-black font-headline text-white uppercase italic">Reglas Clave</h2>`,
        replace: `<h2 class="text-4xl md:text-6xl font-black font-headline text-white uppercase italic">\${content.title || 'Reglas Clave'}</h2>`
    },
    {
        search: `<p class="text-white/40 mt-4 font-medium uppercase tracking-[0.2em] text-[10px] italic">Parámetros Operativos Oficiales 2026</p>`,
        replace: `<p class="text-white/40 mt-4 font-medium uppercase tracking-[0.2em] text-[10px] italic">\${content.desc || 'Parámetros Operativos Oficiales 2026'}</p>`
    },
    {
        search: `<h2 class="text-4xl md:text-7xl font-black font-headline text-white mb-8 uppercase leading-[0.9] italic">\${communityName}</h2>`,
        replace: `<h2 class="text-4xl md:text-7xl font-black font-headline text-white mb-8 uppercase leading-[0.9] italic">\${content.communityName || communityName}</h2>`
    },
    {
        search: `<p class="text-xl text-white/60 font-light leading-relaxed italic">
                            \${welcomeMsg}
                        </p>`,
        replace: `<p class="text-xl text-white/60 font-light leading-relaxed italic">
                            \${content.communityMessage || content.welcomeMsg || welcomeMsg}
                        </p>`
    },
    {
        search: `<h2 class="text-4xl md:text-5xl font-black font-headline text-white mb-12 uppercase italic">Preguntas Frecuentes</h2>`,
        replace: `<h2 class="text-4xl md:text-5xl font-black font-headline text-white mb-12 uppercase italic">\${content.title || 'Preguntas Frecuentes'}</h2>`
    },
    {
        search: `<h2 class="text-4xl md:text-6xl font-black font-headline text-white mb-8 uppercase italic">Certificación y Beneficios</h2>`,
        replace: `<h2 class="text-4xl md:text-6xl font-black font-headline text-white mb-8 uppercase italic">\${content.title || 'Certificación y Beneficios'}</h2>`
    },
    {
        search: `<h2 class="text-5xl md:text-8xl font-black font-headline text-white mb-8 tracking-tighter uppercase italic">¿Listo para operar con <span class="text-[#D4AF37]">capital real?</span></h2>`,
        replace: `<h2 class="text-5xl md:text-8xl font-black font-headline text-white mb-8 tracking-tighter uppercase italic">\${content.title || '¿Listo para operar con <span class="text-[#D4AF37]">capital real?</span>'}</h2>`
    },
    {
        search: `<h2 class="text-4xl font-black font-headline text-white mb-4 uppercase italic">\${dict.title}</h2>`,
        replace: `<h2 class="text-4xl font-black font-headline text-white mb-4 uppercase italic">\${content.title || dict.title}</h2>`
    },
    {
        search: `<p class="text-white/40 text-sm font-medium italic">\${dict.sub}</p>`,
        replace: `<p class="text-white/40 text-sm font-medium italic">\${content.desc || content.subtitle || dict.sub}</p>`
    },
    {
        search: `<button type="submit" class="w-full py-5 bg-[#D4AF37] text-black font-black rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 text-lg uppercase tracking-widest mt-4 italic">\${dict.btn}</button>`,
        replace: `<button type="submit" class="w-full py-5 bg-[#D4AF37] text-black font-black rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 text-lg uppercase tracking-widest mt-4 italic">\${content.buttonText || dict.btn}</button>`
    }
]);

// 2. mamCopy.ts
processFile('mamCopy.ts', [
    {
        search: `Gestiona o invierte capital de forma <span class="text-gradient-mamcopy">profesional, automatizada y transparente.</span>`,
        replace: `\${content.title || 'Gestiona o invierte capital de forma <span class="text-gradient-mamcopy">profesional, automatizada y transparente.</span>'}`
    },
    {
        search: `Accede a las Cuentas MAM y al Copy Trading de Bridge Markets. Dos soluciones. Un mismo ecosistema profesional.`,
        replace: `\${content.desc || 'Accede a las Cuentas MAM y al Copy Trading de Bridge Markets. Dos soluciones. Un mismo ecosistema profesional.'}`
    },
    {
        search: `<span class="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-6 block">Dos soluciones, un ecosistema</span>`,
        replace: `<span class="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-6 block">\${content.tag || 'Dos soluciones, un ecosistema'}</span>`
    },
    {
        search: `<h2 class="text-3xl md:text-5xl font-black font-montserrat text-white mb-10 uppercase">Conectando capital con talento</h2>`,
        replace: `<h2 class="text-3xl md:text-5xl font-black font-montserrat text-white mb-10 uppercase">\${content.title || 'Conectando capital con talento'}</h2>`
    },
    {
        search: `<h2 class="text-4xl md:text-6xl font-black font-montserrat text-white uppercase tracking-tighter">Cuentas MAM</h2>`,
        replace: `<h2 class="text-4xl md:text-6xl font-black font-montserrat text-white uppercase tracking-tighter">\${content.title || 'Cuentas MAM'}</h2>`
    },
    {
        search: `<p class="text-blue-500 font-bold uppercase tracking-widest text-xs">Multi-Account Manager — Gestión profesional centralizada</p>`,
        replace: `<p class="text-blue-500 font-bold uppercase tracking-widest text-xs">\${content.desc || 'Multi-Account Manager — Gestión profesional centralizada'}</p>`
    },
    {
        search: `<h2 class="text-4xl md:text-6xl font-black font-montserrat text-white uppercase tracking-tighter">Copy Trading</h2>`,
        replace: `<h2 class="text-4xl md:text-6xl font-black font-montserrat text-white uppercase tracking-tighter">\${content.title || 'Copy Trading'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white mb-6 uppercase">MAM vs Copy Trading</h2>`,
        replace: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white mb-6 uppercase">\${content.title || 'MAM vs Copy Trading'}</h2>`
    },
    {
        search: `<h2 class="text-4xl md:text-6xl font-black font-montserrat text-white uppercase tracking-tight">Beneficios Principales</h2>`,
        replace: `<h2 class="text-4xl md:text-6xl font-black font-montserrat text-white uppercase tracking-tight">\${content.title || 'Beneficios Principales'}</h2>`
    },
    {
        search: `<h2 class="text-4xl md:text-6xl font-black font-montserrat text-white uppercase tracking-tight">Pasos para comenzar</h2>`,
        replace: `<h2 class="text-4xl md:text-6xl font-black font-montserrat text-white uppercase tracking-tight">\${content.title || 'Pasos para comenzar'}</h2>`
    },
    {
        search: `<h2 class="text-4xl md:text-6xl font-black font-montserrat text-white uppercase tracking-tight">Preguntas Frecuentes</h2>`,
        replace: `<h2 class="text-4xl md:text-6xl font-black font-montserrat text-white uppercase tracking-tight">\${content.title || 'Preguntas Frecuentes'}</h2>`
    },
    {
        search: `<h2 class="text-4xl md:text-7xl font-black font-montserrat text-white mb-8 uppercase italic">¿Listo para comenzar?</h2>`,
        replace: `<h2 class="text-4xl md:text-7xl font-black font-montserrat text-white mb-8 uppercase italic">\${content.title || '¿Listo para comenzar?'}</h2>`
    }
]);

// 3. proLeverage.ts
processFile('proLeverage.ts', [
    {
        search: `Multiplica tu Poder de Compra x12`,
        replace: `\${content.title || 'Multiplica tu Poder de Compra x12'}`
    },
    {
        search: `Accede a la potencia de apalancamiento extremo diseñada para traders profesionales.`,
        replace: `\${content.desc || 'Accede a la potencia de apalancamiento extremo diseñada para traders profesionales.'}`
    },
    {
        search: `<h2 class="text-3xl md:text-5xl font-black font-montserrat text-white mb-6 uppercase">Máxima Potencia de Mercado</h2>`,
        replace: `<h2 class="text-3xl md:text-5xl font-black font-montserrat text-white mb-6 uppercase">\${content.title || 'Máxima Potencia de Mercado'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">Planes X12</h2>`,
        replace: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">\${content.title || 'Planes X12'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">Ejemplo de Trading X12</h2>`,
        replace: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">\${content.title || 'Ejemplo de Trading X12'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">Reglas del Programa X12</h2>`,
        replace: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">\${content.title || 'Reglas del Programa X12'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">Retiros y Pagos</h2>`,
        replace: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">\${content.title || 'Retiros y Pagos'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">¿Por qué operar X12?</h2>`,
        replace: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">\${content.title || '¿Por qué operar X12?'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">Preguntas Frecuentes X12</h2>`,
        replace: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">\${content.title || 'Preguntas Frecuentes X12'}</h2>`
    },
    {
        search: `<h2 class="text-4xl md:text-7xl font-black font-montserrat text-white mb-8 uppercase">Potencia tu Trading Hoy</h2>`,
        replace: `<h2 class="text-4xl md:text-7xl font-black font-montserrat text-white mb-8 uppercase">\${content.title || 'Potencia tu Trading Hoy'}</h2>`
    }
]);

// 4. institutional.ts
processFile('institutional.ts', [
    {
        search: `Infraestructura de Trading Institucional`,
        replace: `\${content.title || 'Infraestructura de Trading Institucional'}`
    },
    {
        search: `Liquidez profunda, ejecución STP/ECN y tecnología de grado bancario.`,
        replace: `\${content.desc || 'Liquidez profunda, ejecución STP/ECN y tecnología de grado bancario.'}`
    },
    {
        search: `<h2 class="text-3xl md:text-5xl font-black font-montserrat text-white mb-6 uppercase">Broker Institucional de Nueva Generación</h2>`,
        replace: `<h2 class="text-3xl md:text-5xl font-black font-montserrat text-white mb-6 uppercase">\${content.title || 'Broker Institucional de Nueva Generación'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">Por qué Operar con Bridge Markets</h2>`,
        replace: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">\${content.title || 'Por qué Operar con Bridge Markets'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">Todos los Productos en un Solo Lugar</h2>`,
        replace: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">\${content.title || 'Todos los Productos en un Solo Lugar'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">Diseñado para Cada Tipo de Trader</h2>`,
        replace: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">\${content.title || 'Diseñado para Cada Tipo de Trader'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">Programa de Partners & IB</h2>`,
        replace: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">\${content.title || 'Programa de Partners & IB'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">Conexión de Ultra Baja Latencia</h2>`,
        replace: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">\${content.title || 'Conexión de Ultra Baja Latencia'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">Cómo Abrir tu Cuenta</h2>`,
        replace: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">\${content.title || 'Cómo Abrir tu Cuenta'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">Preguntas Frecuentes Institucionales</h2>`,
        replace: `<h2 class="text-3xl md:text-6xl font-black font-montserrat text-white uppercase">\${content.title || 'Preguntas Frecuentes Institucionales'}</h2>`
    },
    {
        search: `<h2 class="text-4xl md:text-7xl font-black font-montserrat text-white mb-8 uppercase">Únete a la Evolución Financiera</h2>`,
        replace: `<h2 class="text-4xl md:text-7xl font-black font-montserrat text-white mb-8 uppercase">\${content.title || 'Únete a la Evolución Financiera'}</h2>`
    }
]);

// 5. syntheticUniverse.ts
processFile('syntheticUniverse.ts', [
    {
        search: `El Universo Definitivo de Índices Sintéticos`,
        replace: `\${content.title || 'El Universo Definitivo de Índices Sintéticos'}`
    },
    {
        search: `Operatividad 24/7 en más de 600 activos exclusivos con volatilidad garantizada.`,
        replace: `\${content.desc || 'Operatividad 24/7 en más de 600 activos exclusivos con volatilidad garantizada.'}`
    },
    {
        search: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">Acceso Unificado a 3 Gigantes Sintéticos</h2>`,
        replace: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">\${content.title || 'Acceso Unificado a 3 Gigantes Sintéticos'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">Por qué Operar el Universo Sintético</h2>`,
        replace: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">\${content.title || 'Por qué Operar el Universo Sintético'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">Cómo Comenzar en el Universo Sintético</h2>`,
        replace: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">\${content.title || 'Cómo Comenzar en el Universo Sintético'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">Preguntas sobre Sintéticos</h2>`,
        replace: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">\${content.title || 'Preguntas sobre Sintéticos'}</h2>`
    },
    {
        search: `<h2 class="text-4xl md:text-7xl font-black font-headline text-white mb-8 uppercase">Ingresa al Universo Sintético</h2>`,
        replace: `<h2 class="text-4xl md:text-7xl font-black font-headline text-white mb-8 uppercase">\${content.title || 'Ingresa al Universo Sintético'}</h2>`
    }
]);

// 6. syntheticProduct.ts
processFile('syntheticProduct.ts', [
    {
        search: `Mercados Sintéticos de Alta Volatilidad`,
        replace: `\${content.title || 'Mercados Sintéticos de Alta Volatilidad'}`
    },
    {
        search: `Opera activos digitales respaldados por algoritmos criptográficamente auditados.`,
        replace: `\${content.desc || 'Opera activos digitales respaldados por algoritmos criptográficamente auditados.'}`
    },
    {
        search: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">¿Qué son los Índices Sintéticos?</h2>`,
        replace: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">\${content.title || '¿Qué son los Índices Sintéticos?'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">Las 6 Ventajas de Operar Sintéticos</h2>`,
        replace: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">\${content.title || 'Las 6 Ventajas de Operar Sintéticos'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">Nuestras 4 Familias de Índices</h2>`,
        replace: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">\${content.title || 'Nuestras 4 Familias de Índices'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">5 Pasos para Dominar los Sintéticos</h2>`,
        replace: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">\${content.title || '5 Pasos para Dominar los Sintéticos'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">Especificaciones Técnicas MT5</h2>`,
        replace: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">\${content.title || 'Especificaciones Técnicas MT5'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">Conéctate desde MetaTrader 5</h2>`,
        replace: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">\${content.title || 'Conéctate desde MetaTrader 5'}</h2>`
    },
    {
        search: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">Preguntas Frecuentes</h2>`,
        replace: `<h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-6 uppercase">\${content.title || 'Preguntas Frecuentes'}</h2>`
    },
    {
        search: `<h2 class="text-4xl md:text-7xl font-black font-headline text-white mb-8 uppercase">Comienza tu Viaje en Índices Sintéticos</h2>`,
        replace: `<h2 class="text-4xl md:text-7xl font-black font-headline text-white mb-8 uppercase">\${content.title || 'Comienza tu Viaje en Índices Sintéticos'}</h2>`
    }
]);

// 7. v3.ts
processFile('v3.ts', [
    {
        search: `Tu Talento. Nuestro Capital.`,
        replace: `\${content.title || 'Tu Talento. Nuestro Capital.'}`
    },
    {
        search: `Accede a capital fondeado y escala tus resultados con Bridge Markets.`,
        replace: `\${content.desc || 'Accede a capital fondeado y escala tus resultados con Bridge Markets.'}`
    }
]);

console.log('🎉 Done updating all renderer templates!');
