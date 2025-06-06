# GraphQL

GraphQL เป็นภาษาที่ใช้ในการ Query กับ API ( ใช้แทน REST API ) ช่วยให้ Client ทำการส่ง Request ข้อมูลที่ต้องการไปยัง Server และ ได้รับ Response ข้อมูลตามที่ Client ต้องการได้ง่ายมากขึ้น

> GraphQL ( Client ) <————> Apollo GraphQL ( Server ) <----> Database
 

💡 **"Apollo GraphQL (Server)"** can fully replace "REST API route" 


<p align="center">
 <img src="https://github.com/user-attachments/assets/d55a1f46-d665-454c-ad8e-8ca79006b23a" width="600"/>
</p>

---

## Q:   GraphQL ต่างกับ REST API ยังไง ?

<img src="https://github.com/user-attachments/assets/5823f467-ab3b-4a0c-8a49-6a05bbf72188" width="600"/>

| หัวข้อ | REST API | GraphQL |
|--------|----------|---------|
| 📍 Endpoint | หลาย endpoint | แค่ endpoint เดียว |
| 📦 ข้อมูล | คงที่, อาจได้มาก/น้อยเกิน | ดึงเฉพาะ field ที่ต้องการ |
| ⚙️ Method | ใช้ GET, POST, PUT, DELETE | ใช้ query และ mutation |
| 📈 Performance | อาจ over-fetch/under-fetch | ควบคุมข้อมูลได้แม่นยำ |
| 🚧 Versioning | ต้องมี `/v1`, `/v2` | ไม่ต้อง versioning |
| 📡 เรียนรู้ | ง่ายกว่า, คุ้นเคย | ต้องเรียน syntax เพิ่ม | 

---
## 📁 Server “Apollo”
 
**[ 0. ] Server Setup**
```powershell
npm init -yes; npm pkg set type=module; npm install @apollo/server graphql
```
**[ 1. ] กำหนด Graph Schema ( Typedefs )** ----> RooT Types แบ่งออกเป็น 2 + 1 (additional )

1. Query : Get เลือกดึงข้อมูล User สามารถ Specific ผ่าน arg ได้
2. Mutation : สร้าง User ใหม่
3. Subscription ( add ) : แต่จำเป็นสำหรับ web live update “real time”

**[ 2. ] Set Resolvers**
   เป็น Function handle fetching เชื่อมต่อระหว่าง “Graph Schema” และ “Real Data”   

**[ 3. ] Create  + Start Apollo Server** 

---

## 📁 Client ( Frontend )
   ต้องทำการดึงข้อมูลจาก Server ที่เชื่อมต่อกับฐานข้อมูลไว้ อย่างที่ Set Apollo Server ไปเบื้องต้น

**[ 0. ] : Client Setup  ( after set Vite )**

```powershell
npm install @apollo/client graphql
```

**[ 1. ] useHook**

- useQuery : ดึงข้อมูล คล้าย method “GET” —> แต่ข้อดีคือ specific ได้ว่าต้องการอะไรบ้าง
- useMutation : สร้างข้อมูลขึ้นมาใหม่
- gql : ช่วยให้ tag อ่านง่ายขึ้น
