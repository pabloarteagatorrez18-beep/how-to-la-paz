"use client";

import { useEffect, useState } from "react";

const IMG = {
  hero: "/hero-lapaz.jpg",
  city: "https://static.wixstatic.com/media/108ff4_d5558958600c4c2ca93334fa0a1c80ad~mv2.jpg/v1/fill/w_1800,h_1100,al_c,q_90/108ff4_d5558958600c4c2ca93334fa0a1c80ad~mv2.jpg",
  food: "/food-saltenas.jpg",
  street: "https://www.the-wanderlusters.com/wp-content/uploads/2015/04/La-Paz-Shopping-Street-Bolivia-Wanderlusters-750x500.jpg",
  cable: "https://conteudo.imguol.com.br/c/entretenimento/70/2021/12/28/teleferico-em-la-paz-bolivia-1640722639064_v2_4x3.jpg",
  hills: "https://d2xsxph8kpxj0f.cloudfront.net/310519663145625555/4ZktLNxQHgJReWe7Bns4zn/images/la-paz-sehenswuerdigkeiten.webp",
};

const stories = [
  { tag: "Noticias", title: "La Paz, entre las mejores ciudades para visitar este año", text: "Una ciudad que se entiende desde la altura.", image: IMG.city },
  { tag: "Experiencias", title: "5 experiencias imperdibles que solo existen aquí", text: "Rituales cotidianos, sabores y nuevas miradas.", image: IMG.food },
  { tag: "Guía", title: "Qué hacer en La Paz este fin de semana", text: "Una agenda para vivir la ciudad a tu ritmo.", image: IMG.street },
];

const zones = [
  { id: "centro", name: "Centro histórico", shortName: "Centro", label: "Historia & movimiento", description: "Agrupa el Casco Viejo, San Francisco y las calles donde conviven memoria, comercio, política y vida cotidiana. El mejor punto para comenzar caminando.", highlights: ["Mercado Lanza", "Calle Jaén", "San Francisco"], image: IMG.street, x: 43, y: 31 },
  { id: "sopocachi", name: "Sopocachi + San Jorge", shortName: "Sopocachi", label: "Cultura & cafés", description: "Una zona para encontrarse: casas antiguas, proyectos culturales, cocinas pequeñas, plazas y una vida nocturna con identidad propia.", highlights: ["El Montículo", "Sánchez Lima", "Plaza Abaroa"], image: IMG.city, x: 35, y: 48 },
  { id: "miraflores", name: "Miraflores", shortName: "Miraflores", label: "Arquitectura & memoria", description: "Entre patrimonio, estadios y grandes avenidas, Miraflores muestra una La Paz moderna que todavía conversa con su historia.", highlights: ["Estadio Hernando Siles", "Plaza Villarroel", "Templete"], image: IMG.hills, x: 61, y: 46 },
  { id: "sur", name: "Zona Sur", shortName: "Zona Sur", label: "Valle & nuevos ritmos", description: "Agrupa Obrajes, Calacoto, San Miguel y las rutas hacia Mallasa. Más abajo cambian el clima, el paisaje y la escala de la ciudad.", highlights: ["Obrajes", "San Miguel", "Valle de la Luna"], image: IMG.hero, x: 67, y: 75 },
];

const pillars = [
  ["01", "Descubre", "Barrios, mercados y lugares que todavía se cuentan de boca en boca.", "#descubre"],
  ["02", "Saborea", "Cocina, caseritas, rituales y las historias que viven alrededor de una mesa.", "#saborea"],
  ["03", "Conecta", "Las personas, oficios y proyectos que están transformando la ciudad.", "#conecta"],
  ["04", "Pertenece", "Memoria, identidad y las muchas maneras de llamar hogar a Bolivia.", "#pertenece"],
  ["05", "Vive", "Encuentros pequeños y experiencias creadas desde la comunidad.", "#vive"],
];

function SearchIcon() { return <span className="search-icon" aria-hidden="true" />; }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeZoneId, setActiveZoneId] = useState(zones[0].id);
  const activeZone = zones.find((zone) => zone.id === activeZoneId) ?? zones[0];

  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    }), { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  return (
    <main>
      <header className="header">
        <a className="logo" href="#inicio" aria-label="How To La Paz, inicio"><img src="/how-to-la-paz.png" alt="How To La Paz" /></a>
        <nav className={menuOpen ? "desktop-nav open" : "desktop-nav"} aria-label="Navegación principal">
          {pillars.map(([, item, , href]) => <a href={href} key={item} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
        <div className="head-actions">
          <button aria-label="Buscar"><SearchIcon /></button>
          <button className="hamburger" aria-label="Abrir menú" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-image"><img src={IMG.hero} alt="Teleférico sobre La Paz con el Illimani al fondo" /></div>
        <div className="hero-copy">
          <h1>Descubre<br />La Paz<br />como un paceño</h1>
          <p>Historias, lugares y experiencias para vivir una ciudad más increíble de lo que imaginas.</p>
          <a className="orange-button" href="#lo-ultimo">Explorar La Paz <span>→</span></a>
        </div>
        <div className="hero-index"><span>16° 29′ S</span><span>3.600 M</span></div>
      </section>

      <section className="latest section reveal" id="lo-ultimo">
        <div className="title-row"><div><p className="micro orange">RECIÉN PUBLICADO</p><h2>Lo último</h2></div><a className="simple-link" href="#">Ver todas <span>→</span></a></div>
        <div className="story-grid">
          {stories.map((story) => <article className="story-card" key={story.title}>
            <a href="#" className="story-image"><img src={story.image} alt="" /></a>
            <div className="story-body"><p className="micro">{story.tag}</p><h3><a href="#">{story.title}</a></h3><p>{story.text}</p><a href="#" className="read">Leer más <span>→</span></a></div>
          </article>)}
        </div>
      </section>

      <nav className="topics" aria-label="Temas">
        {pillars.map(([, item, , href]) => <a href={href} key={item}>{item}</a>)}
      </nav>

      <section className="pillars section reveal" id="explora">
        <div className="title-row"><div><p className="micro orange">NUESTRA FORMA DE MIRAR</p><h2>Cinco maneras de<br />entrar a La Paz</h2></div><p className="section-intro">No se trata de verlo todo.<br />Se trata de mirar mejor.</p></div>
        <div className="pillar-grid">{pillars.map(([number, name, description, href]) => <a href={href} className="pillar-card" key={name}><span>{number}</span><h3>{name}</h3><p>{description}</p><b>Descubrir →</b></a>)}</div>
      </section>

      <section className="featured section reveal" id="descubre">
        <div className="featured-photo"><img src={IMG.street} alt="Vida cotidiana en una calle paceña" /></div>
        <article><p className="micro orange">HISTORIA DESTACADA · CULTURA</p><h2>El alma de La Paz está en sus calles</h2><p>Entre pendientes imposibles, mercados y conversaciones al paso, la ciudad se revela en una coreografía cotidiana que no aparece en las postales.</p><a className="simple-link" href="#">Leer historia <span>→</span></a></article>
      </section>

      <section className="districts section reveal" id="barrios">
        <div className="title-row"><div><p className="micro orange">MAPA EDITORIAL INTERACTIVO</p><h2>Explora La Paz<br />por zonas</h2></div><p className="section-intro">Elige una zona para descubrir<br />su ritmo, sus lugares y su carácter.</p></div>
        <div className="map-layout">
          <article className="zone-detail" aria-live="polite">
            <div className="zone-photo"><img src={activeZone.image} alt={`Vista de ${activeZone.name}`} /></div>
            <div className="zone-copy"><p className="micro orange">{activeZone.label}</p><h3>{activeZone.name}</h3><p>{activeZone.description}</p><div className="zone-highlights">{activeZone.highlights.map((place) => <span key={place}>{place}</span>)}</div><a className="simple-link" href="#lo-ultimo">Explorar esta zona <span>→</span></a></div>
          </article>
          <div className="city-map" role="group" aria-label="Zonas de La Paz">
            <svg viewBox="0 0 520 620" aria-hidden="true"><path className="map-shape" d="M120 22C170 10 222 40 238 88c13 39-5 72 17 110 24 42 80 45 101 92 19 44-8 82 18 124 21 34 72 46 83 91 12 46-15 90-55 108-42 20-84-3-115-30-31-27-48-62-87-83-38-20-86-24-106-63-21-41 8-79 5-120-4-52-58-83-54-136 4-48 42-91 81-113 39-23 76-38 114-46Z" /><path className="map-road" d="M137 52C190 120 174 181 229 234s90 84 113 156 43 128 82 176" /><path className="map-road thin" d="M75 176c78 17 128 54 177 104s89 107 173 128" /><path className="map-road thin" d="M95 356c76-12 136 14 186 62s79 77 128 91" /></svg>
            <div className="map-caption"><span>LA PAZ · 3.600 M</span><span>NORTE ↑</span></div>
            {zones.map((zone) => <button className={zone.id === activeZone.id ? "map-pin active" : "map-pin"} style={{ left: `${zone.x}%`, top: `${zone.y}%` }} type="button" aria-pressed={zone.id === activeZone.id} onClick={() => setActiveZoneId(zone.id)} key={zone.id}><i /><span>{zone.shortName}</span></button>)}
          </div>
        </div>
        <div className="zone-tabs" aria-label="Seleccionar zona">{zones.map((zone) => <button className={zone.id === activeZone.id ? "active" : ""} type="button" aria-pressed={zone.id === activeZone.id} onClick={() => setActiveZoneId(zone.id)} key={zone.id}>{zone.name}</button>)}</div>
      </section>

      <section className="agenda section reveal" id="conecta">
        <div className="agenda-heading"><p className="micro orange">AGENDA CULTURAL</p><h2>Esta semana<br />en La Paz</h2><a className="simple-link inverse" href="#">Ver agenda completa <span>→</span></a></div>
        <div className="event-list">
          {[['17', 'AGO', 'Festival de Música Independiente', 'Teatro Nuna · 19:30'], ['18', 'AGO', 'Feria gastronómica', 'Sopocachi · 11:00'], ['20', 'AGO', 'Exposición de fotografía', 'Museo Nacional de Arte · 18:30']].map(([day, month, title, place]) => <a href="#" className="event" key={title}><time><b>{day}</b><span>{month}</span></time><span><strong>{title}</strong><small>{place}</small></span><i>↗</i></a>)}
        </div>
      </section>

      <section className="photo-story reveal" id="pertenece">
        <img src={IMG.city} alt="Panorámica de La Paz al amanecer" />
        <div><p className="micro">PERTENECE · RAÍCES & IDENTIDAD</p><h2>Hay ciudades a las que<br />uno siempre vuelve.</h2><p>Historias sobre memoria, distancia, diáspora y las muchas maneras de llamar hogar a Bolivia.</p><a className="simple-link inverse" href="#lo-ultimo">Leer historias <span>→</span></a></div>
      </section>

      <section className="discover section reveal" id="saborea">
        <div className="title-row"><div><p className="micro orange">SABOREA · FOOD & CULTURE</p><h2>La ciudad también<br />se cuenta comiendo</h2></div><p className="section-intro">Sabores con contexto,<br />no listas de moda.</p></div>
        <div className="discover-grid">
          {[["El ritual paceño de comer una salteña", IMG.food], ["Caseritas: la confianza que organiza un mercado", IMG.street], ["Cinco sabores para comenzar a entender La Paz", IMG.city]].map(([title, image], i) => <a href="#lo-ultimo" key={title}><div><img src={image} alt="" /></div><p className="micro">0{i + 1}</p><h3>{title}</h3><span>Descubrir →</span></a>)}
        </div>
      </section>

      <section className="guide section reveal" id="vive">
        <div className="guide-copy"><p className="micro orange">VIVE · EXPERIENCIA PILOTO</p><h2>La Guía Insider<br />Edición 01</h2><p>Una guía digital pequeña y personal con lugares, rutas y contexto: lo que compartiríamos con un amigo que llega a La Paz.</p><a className="orange-button" href="https://www.instagram.com/howtolapaz/" target="_blank" rel="noreferrer">Quiero enterarme <span>↗</span></a></div>
        <div className="guide-card"><div className="guide-cover"><img src="/how-to-la-paz.png" alt="How To La Paz" /><p className="micro">GUÍA INSIDER · EDICIÓN PILOTO</p><strong>LA PAZ,<br />A TRAVÉS<br />DE NUESTROS<br />OJOS</strong></div><ol><li><b>01</b><span>Dónde empezar si es tu primera vez</span></li><li><b>02</b><span>Comer bien sin perseguir tendencias</span></li><li><b>03</b><span>Barrios para caminar con contexto</span></li><li><b>04</b><span>Mercados, miradores y hallazgos</span></li></ol></div>
      </section>

      <section className="social section reveal"><div><p className="micro orange">LA PAZ, TODOS LOS DÍAS</p><h2>@howtolapaz</h2><p>Más historias de La Paz, todos los días.</p><a className="simple-link" href="https://www.instagram.com/howtolapaz/" target="_blank" rel="noreferrer">Seguir en Instagram <span>↗</span></a></div><div className="social-grid">{[IMG.hero, IMG.street, IMG.food, IMG.cable].map((image) => <a href="https://www.instagram.com/howtolapaz/" target="_blank" rel="noreferrer" key={image}><img src={image} alt="Fotografía de la comunidad How To La Paz" /></a>)}</div></section>

      <footer><div className="footer-main"><img src="/how-to-la-paz.png" alt="How To La Paz" /><p>Una forma diferente de<br />descubrir la ciudad.</p><nav>{pillars.map(([, item, , href]) => <a href={href} key={item}>{item}</a>)}</nav><nav><a href="https://www.instagram.com/howtolapaz/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="#vive">Guía Insider</a><a href="#inicio">Sobre nosotros</a></nav></div><div className="footer-line"><span>© 2026 HOW TO LA PAZ</span><span>HECHO A 3.600 M</span><a href="#inicio">VOLVER ARRIBA ↑</a></div></footer>

      <nav className="mobile-tabs" aria-label="Navegación móvil"><a className="active" href="#inicio"><b>⌂</b>Inicio</a><a href="#explora"><b>⌕</b>Explora</a><a href="#conecta"><b>□</b>Eventos</a><a href="#vive"><b>◇</b>Guía</a><a href="https://www.instagram.com/howtolapaz/" target="_blank" rel="noreferrer"><b>♡</b>Comunidad</a></nav>
    </main>
  );
}
