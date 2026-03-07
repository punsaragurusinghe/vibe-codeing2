def get_valid_mark(prompt):
    """Prompts the user for a numeric mark between 0 and 100 or 'Exit'."""
    while True:
        try:
            line = input(prompt).strip()
            if line.lower() == 'exit':
                return 'exit'
            mark = float(line)
            if 0 <= mark <= 100:
                return mark
            else:
                print("Error: Mark must be between 0 and 100.")
        except ValueError:
            print("Error: Please enter a numeric value or 'Exit'.")

def main():
    while True:
        name = input("\nEnter student's name (or 'Exit' to quit): ").strip()
        if name.lower() == 'exit':
            break
        
        # Get and validate marks for three subjects
        marks = []
        for i in range(1, 4):
            mark = get_valid_mark(f"Enter mark for subject {i}: ")
            if mark == 'exit':
                return # Exit the entire program
            marks.append(mark)

        # Calculate average
        average = sum(marks) / len(marks)

        # Determine grade based on thresholds
        if average >= 75:
            grade = "A"
        elif average >= 60:
            grade = "B"
        elif average >= 40:
            grade = "C"
        else:
            grade = "Fail"

        # Display the formatted result with aligned colons
        print("------------------------------")
        print(f"{'Name':<7}: {name}")
        print(f"{'Average':<7}: {average:.1f}")

if __name__ == "__main__":
    main()
