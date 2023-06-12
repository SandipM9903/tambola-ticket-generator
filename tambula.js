const generateTambulaTickets = (numberOfTickets) => {
    const tickets = [];
  
    // Generate the required number of tickets
    for (let i = 0; i < numberOfTickets; i++) {
      const ticket = {
        ticketId: generateTicketId(),
        ticketData: generateTicketData()
      };
      tickets.push(ticket);
    }
  
    return tickets;
  };
  
  const generateTicketId = () => {
    // Generate a unique ID for each ticket
    return Math.random().toString(36).substring(2, 15);
  };
  
  const generateTicketData = () => {
    // Generate ticket data based on the Tambula rules
    const columns = [[], [], [], [], [], [], [], [], []];
  
    for (let i = 1; i <= 90; i++) {
      const column = Math.floor((i - 1) / 10);
      columns[column].push(i);
    }
  
    const ticketData = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        if (columns[j].length > 0) {
          const randomIndex = Math.floor(Math.random() * columns[j].length);
          const number = columns[j].splice(randomIndex, 1)[0];
          row.push(number);
        } else {
          row.push('x');
        }
      }
      ticketData.push(row);
    }
  
    return ticketData;
  };
  
  module.exports = { generateTambulaTickets };
  