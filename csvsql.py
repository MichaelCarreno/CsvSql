import csv

input_csv_file= 'employees.csv'
output_sql_file= 'employees.sql'
table_name= 'employees'

with open(input_csv_file, 'r', encoding='utf-8') as csv_file, open(output_sql_file, 'w', encoding='utf-8') as sql_file:
    reader = csv.reader(csv_file)
    headers = next(reader)

    sql_file.write(f"CREATE TABLE IF NOT EXIST {table_name} (\n)")
    sql_file.write(", \n".join([f"  {header} TEXT" for header in headers]))
    sql_file.write("\n);\n\n")

    for row in reader:
        values = ', '.join([f"'{value.replace('\'', '\'\'')}'" for value in row])
        sql_file.write(f"INSERT INTO {table_name} ({', '.join(headers)}) VALUES ({values});\n")

        print(f"Archivo SQL '{output_sql_file}' Creado exitosamente")