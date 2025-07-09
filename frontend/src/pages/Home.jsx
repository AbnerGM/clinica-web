import React from "react";
import "../pages/Home.css";

export default function Home() {
  return (
    <main className="main-content">
      {/* Los copos de nieve */}
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}

      <div className="container-fluid py-5">
        {/* el Hero principal */}
        <header className="text-center mb-5" id="inicio">
          <h1 className="display-3 fw-bold text-primary mb-3">
            Bienvenido a <span className="text-success">Clínica Salud+</span>
          </h1>
          <p className="texto-6">
            Tu salud es nuestra prioridad. Atención profesional y cercana.
          </p>
          <a href="#contacto" className="btn-agendar-cita">
  Agenda tu cita <i className="bi bi-calendar-check ms-2"></i>
</a>
        </header>

        {/* Esto es la nueva sección visual destacada */}
        <section className="contenido row align-items-center ">
          <div className="col-md-6 text-center ">
            <h2 className="fw-bold text-primary mb-3">Tecnología y empatía en cada consulta</h2>
            <p className="texto-9">
              En <strong>Clínica Salud+</strong>, combinamos medicina moderna con atención humana. Nuestro equipo está listo para escucharte, apoyarte y ayudarte a sanar.
            </p>
            <a href="#servicios" className="btn btn-outline-primary btn-lg mt-3">
              Ver servicios <i className="bi bi-arrow-right ms-2"></i>
            </a>
          </div>
          <div className="col-md-6 text-center">
            <img
  src="/doctora-1.png"
  alt="Atención médica moderna"
  className="img-fluid imagen-5 glow-persona"
  style={{ maxHeight: "450px", objectFit: "contain" }}
/>
          </div>
        </section>

        {/* Nuestros servicios */}
        <section id="servicios" className="contenido-2 mb-5">
          <h2 className="texto-1 text-center text-secondary fw-semibold ">Nuestros Servicios</h2>
          <div className="row g-4 justify-content-center">
            {[
              {
                icon: "bi-heart-pulse",
                title: "Consultas Médicas",
                desc: "Consulta general y especializada con profesionales certificados.",
                img: "/img-1.jpg",
              },
              {
                icon: "bi-journal-medical",
                title: "Laboratorio",
                desc: "Análisis clínicos con resultados rápidos y confiables.",
                img: "/laboratorio.jpg",
              },
              {
                icon: "bi-capsule",
                title: "Farmacia",
                desc: "Recetas y medicamentos con garantía y atención personalizada.",
                img: "/farmacia.webp",
              },
              {
                icon: "bi-people",
                title: "Atención Personalizada",
                desc: "Seguimiento completo de tu salud y bienestar.",
                img: "/atencion.jfif",
              },
            ].map(({ icon, title, desc, img }, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-3">
                <div
                  className="card h-100 service-card shadow-sm border-0"
                  style={{ backgroundImage: `url(${img})` }}
                >
                  <div className="card-body text-center">
                    <i className={`bi ${icon} service-icon mb-3 fs-1`}></i>
                    <h5 className="card-title fw-bold">{title}</h5>
                    <p className="card-text">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Los testimonios */}
        <section className="mb-5 contenido-3">
          <h2 className="mb-4 text-center text-secondary fw-semibold">Testimonios</h2>
          <div className="row justify-content-center g-4">
            {[
              {
                name: "María López",
                comment: "Excelente atención, me sentí muy cómoda en todo momento.",
              },
              {
                name: "Carlos Pérez",
                comment: "Profesionales de primera. Recomiendo esta clínica al 100%.",
              },
              {
                name: "Ana Torres",
                comment: "Rápido, confiable y con mucha calidez humana. ¡Gracias!",
              },
            ].map(({ name, comment }, idx) => (
              <div key={idx} className="col-12 col-md-4">
                <div className="card border-0 shadow-sm h-100 p-3">
                  <blockquote className="blockquote text-center">
                    <p className="mb-3 fst-italic text-muted">“{comment}”</p>
                    <footer className="blockquote-footer text-primary">{name}</footer>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* El equipo médico */}
        <section className="mb-5">
          <h2 className="mb-4 text-center text-secondary fw-semibold">Conoce a nuestro equipo</h2>
          <div className="row justify-content-center g-5">
            {[
              {
                name: "Dr. Luis Andrade",
                role: "Médico General",
                img: "/prueba.png",
              },
              {
                name: "Dra. Elena Rivas",
                role: "Pediatra",
                img: "/prueba-2.png",
              },
              {
                name: "Dr. Diego Mejía",
                role: "Cardiólogo",
                img: "/prueba-1.png",
              },
            ].map(({ name, role, img }, idx) => (
              <div key={idx} className="col-12 col-md-4">
                <div className="card text-center border-0 shadow-sm">
                  <img
                    src={img}
                    alt={name}
                    className="card-img-top rounded-top"
                    style={{ height: "500px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-primary">{name}</h5>
                    <p className="card-text text-muted">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/*Los contactos */}
        <section id="contacto" className="text-center">
          <h2 className="text-secondary mb-4">Contáctanos</h2>
          <p className="fs-5">
            <strong>Teléfono:</strong> (01) 123-4567 <br />
            <strong>Email:</strong> contacto@clinicasaludplus.com
          </p>
          <a
            href="mailto:contacto@clinicasaludplus.com"
            className="link-btn contact-link"
          >
            Enviar correo
          </a>
        </section>

        {/* Footer */}
        <footer className="text-center mt-5 pt-4 border-top text-muted small">
          <p>© 2025 Clínica Salud+. Todos los derechos reservados.</p>
          <p>Hecho con ❤️ en React</p>
        </footer>
      </div>
    </main>
  );
}
