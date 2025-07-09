package com.clinica.jpa.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clinica.jpa.modelo.Cita;
import com.clinica.jpa.modelo.Medico;
import com.clinica.jpa.modelo.Paciente;

import java.util.List;
import java.util.Date;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {
    List<Cita> findByPaciente(Paciente paciente);
    List<Cita> findByMedico(Medico medico);
    List<Cita> findByEstado(Cita.EstadoCita estado);
    List<Cita> findByFechaHora(Date fechaHora);
}
