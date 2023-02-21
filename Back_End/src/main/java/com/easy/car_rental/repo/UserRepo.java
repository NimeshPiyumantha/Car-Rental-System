package com.easy.car_rental.repo;

import com.easy.car_rental.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface UserRepo extends JpaRepository <User,Integer> {

    @Query(value = "SELECT userName FROM User", nativeQuery = true)
    User findUserName(String userName);
}
