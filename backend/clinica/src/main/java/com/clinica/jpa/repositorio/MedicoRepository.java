package com.clinica.jpa.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.clinica.jpa.modelo.Medico;
import com.clinica.jpa.modelo.Especialidad;
import java.util.List;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {
    List<Medico> findByNombre(String nombre);
    List<Medico> findByApellido(String apellido);
    List<Medico> findByEspecialidad(Especialidad especialidad);
    List<Medico> findByCorreoElectronico(String correoElectronico);
    List<Medico> findByTelefono(String telefono);
}
