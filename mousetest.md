Mouse Interactions Test Plan
1. Overview

Halaman ini digunakan untuk menguji berbagai interaksi mouse: klik, double klik, right click, hover, scroll, dan drag & drop. Test plan ini mencakup test cases manual dan panduan untuk test automation.

2. Test Cases
Test ID	Test Case Description	Precondition	Test Steps	Expected Result	Priority	Type
TC-MO-01	Single Click	User berada di halaman Mouse	Klik tombol "Click Me"	Action Log menampilkan aksi klik	High	Functional
TC-MO-02	Double Click	User berada di halaman Mouse	Double klik tombol "Double Click Me"	Action Log menampilkan aksi double click	High	Functional
TC-MO-03	Right Click	User berada di halaman Mouse	Klik kanan tombol "Right Click Me"	Action Log menampilkan aksi right click	Medium	Functional
TC-MO-04	Hover	User berada di halaman Mouse	Hover mouse ke area "Hover over me"	Area hover berubah warna (UI feedback) dan Action Log menampilkan hover	Medium	Functional
TC-MO-05	Scroll	User berada di halaman Mouse	Scroll pada elemen list	Elemen list bergerak sesuai scroll	Low	Functional
TC-MO-06	Drag & Drop	User berada di halaman Mouse	Drag elemen di area drag & drop ke posisi lain	Elemen berpindah posisi dan Action Log menampilkan drag & drop	High	Functional