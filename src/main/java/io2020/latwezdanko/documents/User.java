package io2020.latwezdanko.documents;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class User
{
  @Id
  @Getter
  @Setter
  private Integer id;
  @Getter
  @Setter
  private String name;
  @Getter
  @Setter
  private String email;

  public User (Integer id, String name, String email)
  {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}