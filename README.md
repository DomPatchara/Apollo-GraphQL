# GraphQL

GraphQL เป็นภาษาที่ใช้ในการ Query กับ API ( ใช้แทน REST API ) ช่วยให้ Client ทำการส่ง Request ข้อมูลที่ต้องการไปยัง Server และ ได้รับ Response ข้อมูลตามที่ Client ต้องการได้ง่ายมากขึ้น

> GraphQL ( Client ) <————> GraphQL ( Server ): อยู่ที่backend setup การดึงข้อมูลจาก database
> 

<aside>
💡

“GraphQL”  VS  “SQL”

GraphQL : ไม่ได้เข้าถึง Database โดยตรง เป็นเเค่ตัวกลางรอรับคำสั่ง Query จาก Frontend  ❌

 SQL         :   ดึงข้อมูลจาก Database ได้โดยตรง   ✅

</aside>

![image.png](attachment:13af3a64-1034-4df9-86ea-d04abb50e05c:image.png)

---

## Q:   GraphQL ต่างกับ REST API ?
![image](https://github.com/user-attachments/assets/5823f467-ab3b-4a0c-8a49-6a05bbf72188)
| หัวข้อ | REST API | GraphQL |
|--------|----------|---------|
| 📍 Endpoint | หลาย endpoint | แค่ endpoint เดียว |
| 📦 ข้อมูล | คงที่, อาจได้มาก/น้อยเกิน | ดึงเฉพาะ field ที่ต้องการ |
| ⚙️ Method | ใช้ GET, POST, PUT, DELETE | ใช้ query และ mutation |
| 📈 Performance | อาจ over-fetch/under-fetch | ควบคุมข้อมูลได้แม่นยำ |
| 🚧 Versioning | ต้องมี `/v1`, `/v2` | ไม่ต้อง versioning |
| 📡 เรียนรู้ | ง่ายกว่า, คุ้นเคย | ต้องเรียน syntax เพิ่ม |
---

## Server “Apollo”

### [ 0. ] Server Setup

```powershell
npm init -yes; npm pkg set type=module; npm install @apollo/server graphql
```

---

### [ 1. ] กำหนด Graph Schema ( Typedefs )

     RooT Types แบ่งออกเป็น 2 + 1 (additional )

1. Query : Get เลือกดึงข้อมูล User สามารถ Specific ผ่าน arg ได้
2. Mutation : สร้าง User ใหม่
3. Subscription ( add ) : แต่จำเป็นสำหรับ web live update “real time”

---

### [ 2. ] Set Resovler

       เป็น Function handle fetching เชื่อมต่อระหว่าง “Graph Schema” และ “Real Data”   
---

### [ 3. ] Create  + Start Apollo Server 

---

## Client ( Frontend )

     ต้องทำการดึงข้อมูลจาก Server ที่เชื่อมต่อกับฐานข้อมูลไว้ อย่างที่ Set Apollo Server ไปเบื้องต้น

### [ 0. ] : Client Setup  ( after set Vite )

```powershell
npm install @apollo/client graphql
```

### [ 1. ] useHook

- useQuery : ดึงข้อมูล คล้าย method “GET” —> แต่ข้อดีคือ specific ได้ว่าต้องการอะไรบ้าง
- useMutation : สร้างข้อมูลขึ้นมาใหม่
- gql : ช่วยให้ tag อ่านง่ายขึ้น
