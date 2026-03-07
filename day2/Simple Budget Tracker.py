def main():
    try:
        # Task 01: Monthly Budget Program
        print("--- Monthly Budget Tracker ---")
        while True:
            try:
                budget_input = input("Enter your total monthly budget (LKR): ").strip()
                budget = float(budget_input)
                break
            except ValueError:
                print("Invalid input. Please enter a numeric value for your budget.")
        
        expenses = []
        print("Enter your expenses (type 'done' to finish):")
        while True:
            entry = input("Enter expense: ").strip().lower()
            if entry == 'done':
                break
            try:
                expense = float(entry)
                expenses.append(expense)
            except ValueError:
                print("Invalid input. Please enter a number or 'done'.")
        
        total_expenses = sum(expenses)
        balance = budget - total_expenses
        
        print(f"\nTotal Budget: {budget:.2f} LKR")
        print(f"Total Expenses: {total_expenses:.2f} LKR")
        print(f"Remaining Balance: {balance:.2f} LKR")
        
        # Task 02: Add Warning Message
        if balance < 500:
            print("Warning: Low Funds")
            
    except ValueError:
        print("Error: Please enter valid numeric values for budget and expenses.")

if __name__ == "__main__":
    main()
