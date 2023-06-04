export const EMAIL_TEMPLATE = `
    Hello {{to_name}}, You got a new reservation {{fullName}}:

    Here are the booking details:

    Shedule: {{duration}}

    Client's Name: {{fullName}}

    Client's Email: {{from_email}}

    Other information: {{message}}

    Best wishes,
    Node Sheduler team
`;
