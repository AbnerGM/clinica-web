package com.clinica.jpa.modelo;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Cita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCita;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_paciente")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // Aca Evita error al convertir JSON
    private Paciente paciente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_medico")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // También aquí tambien lo mismo
    private Medico medico;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date fechaHora;

    @Enumerated(EnumType.STRING)
    private EstadoCita estado;

    public enum EstadoCita {
        Confirmada, Pendiente, Cancelada
    }

    public Long getIdCita() {
        return idCita;
    }

    public void setIdCita(Long idCita) {
        this.idCita = idCita;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Medico getMedico() {
        return medico;
    }

    public void setMedico(Medico medico) {
        this.medico = medico;
    }

    public java.util.Date getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(java.util.Date fechaHora) {
        this.fechaHora = fechaHora;
    }

    public EstadoCita getEstado() {
        return estado;
    }

    public void setEstado(EstadoCita estado) {
        this.estado = estado;
    }
}
