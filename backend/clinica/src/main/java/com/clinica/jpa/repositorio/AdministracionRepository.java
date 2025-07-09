package com.clinica.jpa.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clinica.jpa.modelo.Administracion;

import java.util.List;

@Repository
public interface AdministracionRepository extends JpaRepository<Administracion, Long> {
    List<Administracion> findByNombre(String nombre);
    List<Administracion> findByApellido(String apellido);
    List<Administracion> findByCorreoElectronico(String correoElectronico);
    List<Administracion> findByTelefono(String telefono);
    List<Administracion> findByRol(Administracion.Rol rol);
}
