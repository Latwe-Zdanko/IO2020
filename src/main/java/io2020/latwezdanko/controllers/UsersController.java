package io2020.latwezdanko.controllers;

import io2020.latwezdanko.documents.User;
import io2020.latwezdanko.repositories.UsersRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping ("/users")
public class UsersController
{
  private UsersRepository usersRepository;

  public UsersController (UsersRepository usersRepository)
  {
    this.usersRepository = usersRepository;
  }

  @GetMapping ("/all")
  public List<User> getAll ()
  {
    return usersRepository.findAll ();
  }
}