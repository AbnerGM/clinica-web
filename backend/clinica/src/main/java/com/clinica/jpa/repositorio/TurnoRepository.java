package com.clinica.jpa.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clinica.jpa.modelo.Medico;
import com.clinica.jpa.modelo.Turno;

import java.util.List;
import java.util.Date;

@Repository
public interface TurnoRepository extends JpaRepository<Turno, Long> {
    List<Turno> findByMedico(Medico medico);
    List<Turno> findByFecha(Date fecha);
    List<Turno> findByHoraInicio(Date horaInicio);
    List<Turno> findByHoraFin(Date horaFin);
}
