function shortcutsHandle(event : any) {
    if (event && event.key) {
      const key = event.key.toLocaleLowerCase();
      // Rest of the function logic
    } else {
      console.error('Event object or key property is undefined');
    }
  }