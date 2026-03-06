
 1 - name = input("Enter student's name: ")                                                                            │
│  2 - mark1 = float(input("Enter mark for subject 1: "))                                                                │
│  3 - mark2 = float(input("Enter mark for subject 2: "))                                                                │
│  4 - mark3 = float(input("Enter mark for subject 3: "))                                                                │
│  5 -                                                                                                                   │
│  6 - average = (mark1 + mark2 + mark3) / 3                                                                             │
│  7 -                                                                                                                   │
│  8 - print(f"\nStudent: {name}")                                                                                       │
│  9 - print(f"Average: {average:.2f}")                                                                                  │
│ 10 -                                                                                                                   │
│ 11 - if average >= 75:                                                                                                 │
│ 12 -     grade = "A"                                                                                                   │
│ 13 - elif average >= 60:                                                                                               │
│ 14 -     grade = "B"                                                                                                   │
│ 15 - elif average >= 40:                                                                                               │
│ 16 -     grade = "C"                                                                                                   │
│ 17 - else:                                                                                                             │    
│ 18 -     grade = "Fail"                                                                                                │    
│ 19 -                                                                                                                   │    
│ 20 - if grade == "Fail":                                                                                               │    
│ 21 -     print(f"Result: {grade}")                                                                                     │    
│ 22 - else:                                                                                                             │    
│ 23 -     print(f"Grade: {grade}")                                                                                      │    
│  1 + def get_valid_mark(prompt):                                                                                       │    
│  2 +     """Prompts the user for a numeric mark between 0 and 100."""                                                  │    
│  3 +     while True:                                                                                                   │    
│  4 +         try:                                                                                                      │    
│  5 +             mark = float(input(prompt))                                                                           │    
│  6 +             if 0 <= mark <= 100:                                                                                  │    
│  7 +                 return mark                                                                                       │    
│  8 +             else:                                                                                                 │    
│  9 +                 print("Error: Mark must be between 0 and 100.")                                                   │    
│ 10 +         except ValueError:                                                                                        │    
│ 11 +             print("Error: Please enter a numeric value.")                                                         │    
│ 12 +                                                                                                                   │    
│ 13 + def main():                                                                                                       │    
│ 14 +     name = input("Enter student's name: ")                                                                        │    
│ 15 +                                                                                                                   │    
│ 16 +     # Get and validate marks for three subjects                                                                   │    
│ 17 +     mark1 = get_valid_mark("Enter mark for subject 1: ")                                                          │    
│ 18 +     mark2 = get_valid_mark("Enter mark for subject 2: ")                                                          │    
│ 19 +     mark3 = get_valid_mark("Enter mark for subject 3: ")                                                          │    
│ 20 +                                                                                                                   │    
│ 21 +     # Calculate average                                                                                           │    
│ 22 +     average = (mark1 + mark2 + mark3) / 3                                                                         │    
│ 23 +                                                                                                                   │    
│ 24 +     print(f"\nStudent: {name}")                                                                                   │    
│ 25 +     print(f"Average: {average:.2f}")                                                                              │    
│ 26 +                                                                                                                   │    
│ 27 +     # Determine grade based on thresholds                                                                         │    
│ 28 +     if average >= 75:                                                                                             │    
│ 29 +         grade = "A"                                                                                               │    
│ 30 +     elif average >= 60:                                                                                           │    
│ 31 +         grade = "B"                                                                                               │    
│ 32 +     elif average >= 40:                                                                                           │    
│ 33 +         grade = "C"                                                                                               │    
│ 34 +     else:                                                                                                         │    
│ 35 +         grade = "Fail"                                                                                            │    
│ 36 +                                                                                                                   │    
│ 37 +     # Display the result                                                                                          │    
│ 38 +     if grade == "Fail":                                                                                           │    
│ 39 +         print(f"Result: {grade}")                                                                                 │    
│ 40 +     else:                                                                                                         │    
│ 41 +         print(f"Grade: {grade}")                                                                                 │    
│ 42 +                                                                                                                   │    
│ 43 + if __name__ == "__main__":                                                                                        │    
│ 44 +     main() 