import React, { useState } from 'react';

function UserProfile() {
  // Initialisieren des Zustands mit einem Objekt
  const [user, setUser] = useState({
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com'
  });

  // Funktion zum Aktualisieren des Namens
  const updateName = (newName) => {
    setUser((prevUser) => ({
      ...prevUser, // Beibehalten der bestehenden Eigenschaften
      name: newName // Überschreiben des Namens
    }));
  };