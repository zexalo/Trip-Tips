package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class DemoController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public String addUser(@RequestParam String first, @RequestParam String last) {
        User user = new User();
        user.setFirstName(first);
        user.setLastName(last);
        userRepository.save(user);
        return "Added new customer to repo!";
    }

    @GetMapping("/list")
    public Iterable<User> getCustomers() {
        return userRepository.findAll();
    }

    @GetMapping("/find/{id}")
    public User findCustomerById(@PathVariable Integer id) {
        return userRepository.findCustomerById(id);
    }
}
