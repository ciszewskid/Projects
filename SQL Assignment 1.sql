-- The Member Table

CREATE TABLE Member (
	Member_id INT PRIMARY KEY,
	first_name VARCHAR(20),
    last_name VARCHAR(20),
    Member_location VARCHAR(20),
    Member_age INT
);

-- The Vehicle Table

CREATE TABLE Vehicle (
	Vehicle_reg VARCHAR(10) PRIMARY KEY,
    Vehicle_make VARCHAR(10),
    Vehicle_model VARCHAR(10),
    Member_id INT
--     FOREIGN KEY (Member_id) REFERENCES Member(Member_id)
);

-- The Engineer Table

CREATE TABLE Engineer (
	Engineer_id INT PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(20)
);

-- The Breakdown Table

CREATE TABLE Breakdown (
	Breakdown_id INT PRIMARY KEY,
    Vehicle_reg VARCHAR(10),
    Engineer_id INT,
    Breakdown_date DATE,
    Breakdown_time TIME,
    Breakdown_location VARCHAR(20)
    -- Commenting out these forgein keys to make way for the task asking for manual insertion of them
    -- FOREIGN KEY (Vehicle_reg) REFERENCES Vehicle(vehicle_reg),
--     FOREIGN KEY (Engineer_id) REFERENCES Engineer(Engineer_id)
);

-- Setting the foreign key in the Vehicle Table
ALTER TABLE Vehicle
ADD CONSTRAINT FK_Member_Vehicle
FOREIGN KEY (Member_ID) REFERENCES Member(Member_ID);

-- Setting the foreign keys in the Breakdown Table
ALTER TABLE Breakdown
ADD CONSTRAINT FK_Vehicle_Breakdown
FOREIGN KEY (Vehicle_Reg) REFERENCES Vehicle(Vehicle_Reg);

ALTER TABLE Breakdown
ADD CONSTRAINT FK_Engineer_Breakdown
FOREIGN KEY (Engineer_ID) REFERENCES Engineer(Engineer_ID);


-- Inserting data into tables

-- Member
INSERT INTO Member (Member_ID, First_Name, Last_Name, Member_Location, Member_Age) VALUES
(1, 'John', 'Doe', 'New York', 30),
(2, 'Jane', 'Smith', 'Los Angeles', 28),
(3, 'Mike', 'Johnson', 'Chicago', 35),
(4, 'Emily', 'Davis', 'Houston', 25),
(5, 'David', 'Wilson', 'Phoenix', 40);

-- vehicle
INSERT INTO Vehicle (Vehicle_Reg, Vehicle_Make, Vehicle_Model, Member_ID) VALUES
('ABC123', 'Toyota', 'Camry', 1),
('DEF456', 'Honda', 'Civic', 2),
('GHI789', 'Ford', 'Mustang', 3),
('JKL012', 'Chevrolet', 'Malibu', 4),
('MNO345', 'Nissan', 'Altima', 5),
('PQR678', 'BMW', 'X5', 1),
('STU901', 'Audi', 'A4', 2),
('VWX234', 'Mercedes', 'C-Class', 3);

-- Engineer
INSERT INTO Engineer (Engineer_ID, First_Name, Last_Name) VALUES
(1, 'Alice', 'Brown'),
(2, 'Bob', 'Williams'),
(3, 'Charlie', 'Miller');

-- Breakdown
INSERT INTO Breakdown (Breakdown_ID, Vehicle_Reg, Engineer_ID, Breakdown_Date, Breakdown_Time, Breakdown_Location) VALUES
(1, 'ABC123', 1, '2022-01-01', '08:30:00', 'New York'),
(2, 'DEF456', 2, '2023-06-01', '09:45:00', 'Los Angeles'),
(3, 'GHI789', 3, '2021-08-02', '10:15:00', 'Chicago'),
(4, 'JKL012', 1, '2023-06-23', '11:30:00', 'Houston'),
(5, 'MNO345', 2, '2022-08-03', '12:00:00', 'Phoenix'),
(6, 'PQR678', 3, '2024-08-04', '13:45:00', 'New York'),
(7, 'STU901', 1, '2024-08-04', '14:15:00', 'Los Angeles'),
(8, 'VWX234', 2, '2023-08-05', '15:30:00', 'Chicago'),
(9, 'ABC123', 3, '2024-08-06', '16:00:00', 'New York'),
(10, 'DEF456', 1, '2024-08-06', '17:45:00', 'Los Angeles'),
(11, 'MNO345', 2, '2024-09-01', '18:15:00', 'Phoenix'),
(12, 'ABC123', 3, '2024-09-02', '19:00:00', 'New York');

-- 1.	Retrieve the first 3 members from the Member table.
SELECT * FROM Member LIMIT 3;
-- 2.	Retrieve 3 members, skipping the first 2.
SELECT * FROM Member LIMIT 3 OFFSET 2;
-- 3.	Retrieve all vehicles whose Vehicle_Make starts with 'T'.
SELECT * FROM Vehicle WHERE Vehicle_make LIKE "T%";
-- 4.	Retrieve all breakdowns that occurred between '2023-01-01' and '2023-06-30'.
SELECT * FROM Breakdown WHERE Breakdown_date BETWEEN '2023-01-01' AND '2023-06-30';
-- 5.	Retrieve details of vehicles with three Vehicle_Registration of you own choice in the list –  for example vehicles with registration 'ABC123', 'XYZ789', 'ANZ789'.
SELECT * FROM Vehicle WHERE vehicle_reg IN ('ABC123', 'VWX234', 'GHI789');
-- 6.	Retrieve the number of breakdowns each vehicle has had.
SELECT Vehicle_reg, COUNT(*) AS "Number of Breakdowns" FROM Breakdown GROUP BY Vehicle_reg;
-- 7.	Retrieve all members sorted by Member_Age in descending order
SELECT * FROM Member ORDER BY Member_age DESC;
-- 8.	Retrieve all vehicles that are either 'Toyota' make or 'Honda' make, and the model starts with 'C’
SELECT * FROM Vehicle WHERE (vehicle_make = "Toyota" OR vehicle_make = "Honda") AND Vehicle_model LIKE "C%";
-- 9.	Retrieve all engineers who do not have any breakdowns assigned (use LEFT JOIN and IS NULL)
SELECT e.* FROM Engineer e LEFT JOIN Breakdown b ON e.Engineer_id = b.Engineer_id WHERE b.Engineer_id IS NULL;
-- 10.	Retrieve all members aged between 25 and 40
SELECT * FROM Member WHERE Member_age BETWEEN 25 AND 40;
-- 11.	Retrieve all members whose First_Name starts with 'J' and Last_Name contains 'son'
SELECT * FROM Member WHERE first_name LIKE "M%" AND last_name LIKE "%son%";
-- 12.	Retrieve the top 5 oldest member.
SELECT * FROM Member ORDER BY Member_age DESC LIMIT 5;
-- 13.	Retrieve all vehicle registrations in uppercase.
SELECT UPPER(vehicle_reg) AS "Vehicle Regestration in uppercase" FROM Vehicle;
-- 14.	Retrieve the details of all members along with the vehicles they own.
SELECT m.*, v.* FROM Member m LEFT JOIN Vehicle v ON m.Member_id = v.Member_id;
-- 15.	Retrieve all members and any associated vehicles, including members who do not own any vehicles.
SELECT m.*, v.* FROM Member m LEFT JOIN Vehicle v ON m.Member_id = v.Member_id;
-- 16.	Retrieve all vehicles and the associated members, including vehicles that are not owned by any members
SELECT v.*, m.* FROM Vehicle v LEFT JOIN Member m ON v.Member_id = m.Member_id;
-- 17.	Retrieve the number of breakdowns each member has had
SELECT m.Member_id, m.First_name, m.last_name, COUNT(b.Breakdown_id) AS "Breakdown number per person" FROM Member m LEFT JOIN Vehicle v ON m.Member_id = v.Member_id LEFT JOIN Breakdown b ON v.Vehicle_reg = b.Vehicle_reg GROUP BY m.Member_id, m.first_name, m.last_name;
-- 18.	Retrieve all breakdowns along with member first name and last name that occurred for vehicles owned by members aged over 50
SELECT b.*, m.first_name, m.last_name FROM Breakdown b JOIN Vehicle v ON b.Vehicle_reg = v.Vehicle_reg JOIN Member m ON v.Member_id = m.Member_id WHERE m.Member_age > 35;


-- AVG - Average calculates the average value of a dataset
SELECT AVG(Member_age) AS "Average Age" FROM Member;

-- MAX - Maximum returns the maximum value in a specified column
SELECT MAX(Member_age) AS "Oldest" FROM Member;

-- MIN - Minimum returns the smallest / minimum value in a specified column
SELECT MIN(Member_age) AS "Youngest" FROM member;

-- SUM - Sum adds up all values in a numberic column
SELECT SUM(Member_age) AS "Total Age" FROM Member;

-- UPDATING AND DELETING RECORDS
SELECT * FROM Engineer;
UPDATE Engineer SET first_name = "Tony", last_name = "Hammond" WHERE Engineer_id = 1;
UPDATE Engineer SET first_name = "Alecia", last_name = "Florick" WHERE Engineer_id = 2;
UPDATE Engineer SET first_name = "Max", last_name = "Smith" WHERE Engineer_id = 3;

SELECT * FROM Breakdown;
DELETE FROM Breakdown WHERE Breakdown_id = 5;
DELETE FROM Breakdown WHERE Breakdown_id = 8;



































