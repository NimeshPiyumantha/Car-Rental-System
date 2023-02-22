package com.easy.car_rental.repo;

import com.easy.car_rental.entity.Car;
import com.easy.car_rental.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface UserRepo extends JpaRepository<User, String> {
    @Query(value = " SELECT * FROM User WHERE role_Type =?1 and user_Name=?2 and password=?3", nativeQuery = true)
    ArrayList<User> getLoginUser(String role_Type, String user_Name,String password);
}
