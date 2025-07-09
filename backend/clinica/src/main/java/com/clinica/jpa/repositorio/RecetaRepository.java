package com.clinica.jpa.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clinica.jpa.modelo.ConsultaMedica;
import com.clinica.jpa.modelo.Receta;

@Repository
public interface RecetaRepository extends JpaRepository<Receta, Long> {
    List<Receta> findByConsulta(ConsultaMedica consulta);
    List<Receta> findByMedicamentosContainingIgnoreCase(String medicamentos);
}
