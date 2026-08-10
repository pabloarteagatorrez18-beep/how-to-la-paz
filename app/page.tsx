"use client";

import { useEffect, useState } from "react";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1641736047534-afd0c9014a7c?auto=format&fit=crop&w=1800&q=88",
  street: "https://www.the-wanderlusters.com/wp-content/uploads/2015/04/La-Paz-Shopping-Street-Bolivia-Wanderlusters-750x500.jpg",
  city: "https://static.wixstatic.com/media/108ff4_d5558958600c4c2ca93334fa0a1c80ad~mv2.jpg/v1/fill/w_1600,h_1066,al_c,q_90/108ff4_d5558958600c4c2ca93334fa0a1c80ad~mv2.jpg",
  cable: "https://conteudo.imguol.com.br/c/entretenimento/70/2021/12/28/teleferico-em-la-paz-bolivia-1640722639064_v2_4x3.jpg",
  hills: "https://d2xsxph8kpxj0f.cloudfront.net/310519663145625555/4ZktLNxQHgJReWe7Bns4zn/images/la-paz-sehenswuerdigkeiten.webp",
  market: "https://image-worker.mindtrip.ai/image-resize/format%3Dwebp%2Cw%3D1200/https%3A/images.mindtrip.ai/attractions/a8b7/c813/6281/2b33/1bc1/6a35/be41/e3ab",
  dusk: "https://ce.gatech.edu/sites/default/files/styles/gtcoe_wide/public/news/teasers/Bolivia_Teleferico%20Car_t.jpg?itok=-RHx5HS",
};

const latest = [
  { category: "Gastronomía", title: "5 lugares para descubrir la nueva cocina paceña", note: "Sabores que miran al futuro sin soltar sus raíces.", image: IMAGES.market },
  { category: "Ciudad", title: "Una tarde caminando por Sopocachi", note: "Cafés, librerías y esquinas que cuentan historias.", image: IMAGES.street },
  { category: "Cultura", title: "El Gran Poder explicado desde sus protagonistas", note: "La fiesta que transforma la ciudad cada invierno.", image: IMAGES.cable },
];

const neighborhoods = [
  ["Sopocachi", "Cafés, cultura y vida urbana.", IMAGES.street],
  ["Centro", "Historia en movimiento.", IMAGES.city],
  ["San Pedro", "Mercados y memoria popular.", IMAGES.market],
  ["Miraflores", "La ciudad entre plazas.", IMAGES.cable],
  ["Zona Sur", "Otro ritmo bajo el Illimani.", IMAGES.hills],
  ["El Alto", "Horizonte, feria y potencia.", IMAGES.dusk],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <header className="site-header">
        <a href="#inicio" className="brand" aria-label="How To La Paz, inicio"><img src="/how-to-la-paz.png" alt="How To La Paz" /></a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegación principal">
          {['Explora','Historias','Barrios','Agenda','Fotos','Sobre La Paz'].map((item) => <a href="#" key={item} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
        <div className="header-actions">
          <button className="search" aria-label="Buscar"><span></span></button>
          <button className="menu" aria-label="Abrir menú" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i></i><i></i></button>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy reveal">
          <p className="eyebrow">Guía contemporánea de ciudad</p>
          <h1>Descubre La Paz<br /><em>como un paceño.</em></h1>
          <p className="hero-intro">Historias, lugares y experiencias para entender una de las ciudades más increíbles del mundo.</p>
          <a className="text-link" href="#explora">Explorar La Paz <b>→</b></a>
        </div>
        <figure className="hero-media">
          <img src={IMAGES.hero} alt="Teleférico sobre la ciudad de La Paz y el Illimani" />
          <figcaption><span>16° 29′ S</span><span>3.600 m s. n. m.</span></figcaption>
        </figure>
      </section>

      <nav className="topics" aria-label="Temas">
        {['Gastronomía','Cultura','Lugares','Eventos','Barrios','Naturaleza','Vida nocturna'].map((topic, i) => <a href="#" className={i === 0 ? 'active' : ''} key={topic}>{topic}</a>)}
      </nav>

      <section className="feature section reveal" id="explora">
        <div className="section-kicker"><span>01</span><p>Historia destacada</p></div>
        <div className="feature-grid">
          <figure className="image-frame"><img src={IMAGES.street} alt="Vida cotidiana en las calles de La Paz" /></figure>
          <article>
            <p className="category">Cultura</p>
            <h2>El alma de La Paz está en sus calles</h2>
            <p>Entre pendientes imposibles, mercados y conversaciones al paso, la ciudad se revela en una coreografía cotidiana que no aparece en las postales.</p>
            <a className="text-link" href="#">Leer historia <b>→</b></a>
          </article>
        </div>
      </section>

      <section className="section latest reveal">
        <div className="section-heading"><h2>Lo último</h2><a className="text-link" href="#">Ver todas <b>→</b></a></div>
        <div className="latest-grid">
          {latest.map((item, i) => <article className="story" key={item.title}>
            <a className="image-frame" href="#"><img src={item.image} alt="" /></a>
            <div className="story-meta"><span className="category">{item.category}</span><span>0{i + 1}.08.26</span></div>
            <h3><a href="#">{item.title}</a></h3><p>{item.note}</p>
          </article>)}
        </div>
      </section>

      <section className="neighborhoods section reveal">
        <div className="section-heading split"><div><p className="category">La ciudad, zona por zona</p><h2>Explora La Paz<br />por barrios</h2></div><p>Cada zona tiene una forma diferente<br />de vivir la ciudad.</p></div>
        <div className="mosaic">
          {neighborhoods.map(([name, desc, image], i) => <a href="#" className={`tile tile-${i + 1}`} key={name}>
            <img src={image} alt={`Vista de ${name}`} /><span><strong>{name}</strong><small>{desc}</small></span>
          </a>)}
        </div>
      </section>

      <section className="agenda section reveal">
        <div className="agenda-title"><p className="category">Agenda cultural</p><h2>Esta semana<br />en La Paz</h2><a className="text-link" href="#">Ver agenda completa <b>→</b></a></div>
        <div className="events">
          {[['17','AGO','Festival de Música Independiente','Teatro Nuna · 19:30'],['18','AGO','Feria gastronómica','Sopocachi · 11:00'],['20','AGO','Exposición de fotografía','Museo Nacional de Arte · 18:30']].map(([day, month, title, place]) => <a href="#" className="event" key={title}><time><b>{day}</b>{month}</time><span><strong>{title}</strong><small>{place}</small></span><i>↗</i></a>)}
        </div>
      </section>

      <section className="photo-essay reveal">
        <div className="photo-image"><img src={IMAGES.city} alt="Panorámica de La Paz al amanecer" /></div>
        <div className="photo-copy"><p className="category">Desde nuestra mirada · Photo essay 01</p><h2>Una mañana sobre<br />los 3.600 metros.</h2><p>La primera luz toca los ladrillos y revela una ciudad suspendida entre la tierra y el cielo.</p><a className="text-link light" href="#">Ver historia fotográfica <b>→</b></a></div>
      </section>

      <section className="different section reveal">
        <div className="section-heading"><h2>Más allá de<br /><em>lo turístico</em></h2><p>Rutas para mirar la ciudad<br />con otros ojos.</p></div>
        <div className="different-list">
          {[['Mercados que vale la pena conocer',IMAGES.market],['Miradores que pocos visitan',IMAGES.hills],['Dónde escuchar música en vivo',IMAGES.dusk]].map(([title,img],i) => <a href="#" className="different-item" key={title}><span>0{i+1}</span><h3>{title}</h3><div className="mini-image"><img src={img} alt="" /></div><i>→</i></a>)}
        </div>
      </section>

      <section className="instagram section reveal">
        <div className="insta-copy"><p className="category">La Paz, todos los días</p><h2>@howtolapaz</h2><p>Más historias de La Paz, todos los días.</p><a className="text-link" href="#">Seguir en Instagram <b>↗</b></a></div>
        <div className="insta-grid">{[IMAGES.hero,IMAGES.street,IMAGES.market,IMAGES.cable].map((img,i) => <a href="#" className={`insta-${i}`} key={img}><img src={img} alt="Fotografía de la comunidad How To La Paz" /></a>)}</div>
      </section>

      <footer>
        <div className="footer-top"><img src="/how-to-la-paz.png" alt="How To La Paz" /><p>Una forma diferente<br />de descubrir la ciudad.</p><div className="footer-nav">{['Explora','Historias','Agenda','Barrios','Sobre nosotros','Contacto'].map(x=><a href="#" key={x}>{x}</a>)}</div><div className="socials">{['Instagram','Facebook','TikTok'].map(x=><a href="#" key={x}>{x} ↗</a>)}</div></div>
        <div className="footer-bottom"><span>© 2026 HOW TO LA PAZ</span><span>HECHO A 3.600 M</span><a href="#inicio">Volver arriba ↑</a></div>
      </footer>
    </main>
  );
}
