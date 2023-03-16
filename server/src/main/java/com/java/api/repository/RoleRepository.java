package com.java.api.repository;

import com.java.api.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoleRepository extends JpaRepository<Role, Long> {
    @Query("FROM Role WHERE name=:name")
    Role findByName(@Param("name") String name);
}
