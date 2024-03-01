import * as fs from 'fs';
import * as readline from 'readline';

// Interface voor operator gegevens
interface Operator {
    id: number;
    name: string;
    description: string;
    age: number;
    active: boolean;
    birthdate: string;
    profileImageUrl: string;
    status: string;
    hobbies: string[];
    otherOperator: OtherOperator;
}

// Interface voor Otheroperator gegevens
interface OtherOperator {
    id: number;
    role: string;
    primaryWeapon: string;
    secondaryWeapon: string;
    gadget: string;
    bio: string;
}

// Functie om JSON data te lezen van een bestand
function readJSONFile(filename: string): Operator[] {
    try {
        const data: string = fs.readFileSync(filename, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Er is een fout opgetreden bij het lezen van het bestand:', error);
        return [];
    }
}

// Functie om gegevens op een overzichtelijke manier weer te geven
function showData(data: Operator[]): void {
    data.forEach(operator => {
        console.log(`
            ID: ${operator.id}
            Name: ${operator.name}
            Description: ${operator.description}
            Age: ${operator.age}
            Active: ${operator.active ? 'Yes' : 'No'}
            Birthdate: ${operator.birthdate}
            Profile Image URL: ${operator.profileImageUrl}
            Status: ${operator.status}
            Hobbies: ${operator.hobbies.join(', ')}
            -------------------------------
        `);
    });
}

// Functie om gegevens te filteren op ID
function filterByID(data: Operator[], id: number): void {
    const result = data.find(operator => operator.id === id);
    if (result) {
        console.log('Gevonden gegevens:');
        console.log(`
            ID: ${result.id}
            Name: ${result.name}
            Description: ${result.description}
            Age: ${result.age}
            Active: ${result.active ? 'Yes' : 'No'}
            Birthdate: ${result.birthdate}
            Profile Image URL: ${result.profileImageUrl}
            Status: ${result.status}
            Hobbies: ${result.hobbies.join(', ')}
            -------------------------------
        `);
    } else {
        console.log('Geen gegevens gevonden voor het opgegeven ID.');
    }
}

// Hoofdfunctie
function main(): void {
    const data: Operator[] = readJSONFile('r6.json');
    if (data.length === 0) {
        console.log('Geen gegevens beschikbaar.');
        return;
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('Welkom bij de JSON gegevens weergave!\n');

    const menu = `
    1. Bekijk alle gegevens
    2. Filter op ID
    3. Exit`;

    function showMenu() {
        console.log(menu);
        rl.question('\nVoer uw keuze in: ', (choice: string) => {
            switch (choice) {
                case '1':
                    console.log('\n- Bekijk alle gegevens:');
                    showData(data);
                    showMenu();
                    break;
                case '2':
                    rl.question('\nVoer het ID in om op te filteren: ', (id: string) => {
                        filterByID(data, parseInt(id));
                        showMenu();
                    });
                    break;
                case '3':
                    rl.close();
                    break;
                default:
                    console.log('\nOngeldige keuze. Probeer opnieuw.\n');
                    showMenu();
                    break;
            }
        });
    }

    showMenu();
}

// Start de applicatie
main();
