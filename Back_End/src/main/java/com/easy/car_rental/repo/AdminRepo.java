package com.easy.car_rental.repo;

import com.easy.car_rental.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface AdminRepo extends JpaRepository<Admin, String> {
}
