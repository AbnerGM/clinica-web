package com.clinica.jpa.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.clinica.jpa.modelo.HistorialMedico;
import com.clinica.jpa.modelo.Paciente;

import java.util.List;

@Repository
public interface HistorialMedicoRepository extends JpaRepository<HistorialMedico, Long> {
    List<HistorialMedico> findByPaciente(Paciente paciente);
}
