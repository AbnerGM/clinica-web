package com.clinica.jpa.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clinica.jpa.modelo.ConsultaMedica;
import com.clinica.jpa.modelo.Medico;
import com.clinica.jpa.modelo.Paciente;

import java.util.List;
import java.util.Date;

@Repository
public interface ConsultaMedicaRepository extends JpaRepository<ConsultaMedica, Long> {
    List<ConsultaMedica> findByPaciente(Paciente paciente);
    List<ConsultaMedica> findByMedico(Medico medico);
    List<ConsultaMedica> findByFecha(Date fecha);
    List<ConsultaMedica> findByDiagnostico(String diagnostico);
    List<ConsultaMedica> findByTratamiento(String tratamiento);
}
