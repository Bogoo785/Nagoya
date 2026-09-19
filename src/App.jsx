import { useState } from 'react'
import transport from './transport.json'
import { ArrowLeft, ArrowRight, Bus, CloudSnow, Landmark, Luggage, MapPin, Plane, TrainFront } from 'lucide-react'

const days = [
  { day:1, date:'1/6（三）', short:'抵達名古屋', title:'抵達名古屋', subtitle:'18:50 落地，第一晚只排入住＋晚餐', region:'高雄 → 中部國際機場 → 名古屋', icon:Plane, note:'不塞景點，冬天班機、行李、交通有延誤也不會影響後面。', events:[['14:50','搭乘 IT268，由高雄 KHH 飛往名古屋 NGO。','plane'],['18:50','抵達中部國際機場第二航廈（Terminal 2），入境、領行李。','plane'],['19:50 左右','步行到機場站，搭名鐵 μSKY 前往名鐵名古屋，最快約 28 分鐘。','train'],['20:30–21:00','抵達名古屋站、入住飯店；先熟悉 JR／名鐵／近鐵與地下街位置。','hotel'],['21:00 後','名古屋站附近吃晚餐／宵夜，第一晚不再安排景點。','food']], tip:'建議住名古屋站步行 5–10 分鐘內；若 KKday 在名古屋站西口集合，住太閤通口一帶尤其方便。' },
  { day:2, date:'1/7（四）', short:'名古屋經典', title:'名古屋經典', subtitle:'名古屋城＋榮商圈', region:'名古屋市區', icon:Landmark, note:'用第一個完整日認識城區，把歷史景點、城市散步與購物排在同一條順路動線。', events:[['09:00','名古屋城：城跡、本丸御殿、西之丸御藏城寶館。','landmark'],['11:30','金鯱橫丁午餐，適合一次吃名古屋特色料理。','food'],['13:00','久屋大通公園散步，接著往榮商圈。','walk'],['15:00','Oasis 21、MIRAI TOWER 周邊拍照／咖啡。','sparkle'],['17:00','榮百貨、Loft、地下街購物，晚餐吃鰻魚飯三吃或居酒屋。','shop']], tip:'目前天守閣仍無法入內，但本丸御殿可參觀。一般開園 09:00–16:30，本丸御殿最晚 16:00 前入場；1/1 休園。' },
  { day:3, date:'1/8（五）', short:'犬山一日', title:'犬山一日', subtitle:'國寶天守＋城下町', region:'名古屋 → 犬山', icon:TrainFront, note:'這天自己搭名鐵最簡單，交通短、步行好逛，也很適合冬天。', events:[['08:20','從名鐵名古屋站出發。','train'],['約 09:00','抵達犬山站；快速特急／特急約 25 分鐘，再步行約 20 分鐘往城下町。','train'],['09:20','三光稻荷神社 → 針綱神社，沿路往犬山城。','landmark'],['10:00','犬山城登天守。木造樓梯很陡，冬天鞋底若濕要更小心。','landmark'],['11:30','犬山城下町午餐＋小吃：五平餅、田樂、抹茶甜點等。','food'],['13:30','有樂苑／國寶茶室如庵，想悠閒就安排 1–1.5 小時。','walk'],['15:30','慢慢走回犬山站，回名古屋。','train'],['17:00','名古屋站逛 JR Gate Tower、Takashimaya、地下街。','shop']], tip:'犬山城開放 09:00–17:00，最後入場 16:30；成人門票目前為 ¥1,000。' },
  { day:4, date:'1/9（六）', short:'高山＋白川鄉', title:'高山＋白川鄉', subtitle:'KKday 巴士一日遊 · 約 10 小時', region:'名古屋 → 飛驒高山 → 白川鄉', icon:Bus, note:'已選定 KKday「白川鄉合掌村＆飛驒高山老街」一日遊，含名古屋往返巴士與中英文隨車服務。', bookingUrl:'https://www.kkday.com/zh-tw/product/17716-nagoya-tour-shirakawago-hida-takayama-japan-gifu', events:[['07:50','抵達名古屋車站 VIP LINER 巴士站報到；請務必於發車前 10 分鐘抵達。','bus'],['08:00','準時從名古屋出發，逾時不候。','bus'],['10:30–12:00','飛驒高山老街自由活動約 90 分鐘，漫步三町筋、酒藏並品嘗飛驒牛小吃。','walk'],['12:45–15:15','白川鄉合掌村自由活動約 150 分鐘；依所選方案午餐可能自理或包含餐食。','snow'],['約 18:00','返回名古屋車站；實際抵達時間與地點視當日交通狀況而定。','bus']], tip:'冬季若天候或道路中斷而無法前往白川鄉，行程將改為高山老街約 150 分鐘＋郡上八幡約 120 分鐘。一般日團不是夜間點燈團。' },
  { day:5, date:'1/10（日）', short:'神社＋老街', title:'熱田神宮＋大須', subtitle:'把名古屋的傳統與街區一次逛完', region:'名古屋市區', icon:Landmark, note:'交通都在市區，前一日跟團太累也可以晚一點出門。', events:[['09:30','熱田神宮：從名鐵神宮前站步行約 3 分鐘。','landmark'],['11:30','神宮周邊或金山一帶午餐。','food'],['13:00','大須觀音 → 大須商店街，邊逛邊吃。','walk'],['16:00','回榮或矢場町，補逛百貨／電器／藥妝。','shop'],['晚上','推薦安排世界の山ちゃん類型手羽先、味噌關東煮等名古屋系晚餐。','food']], tip:'這天節奏刻意放鬆，若前一天受冬季路況影響晚歸，可以放心延後出發。' },
  { day:6, date:'1/11（一）', short:'鐵道＋港區', title:'磁浮鐵道館＋金城埠頭', subtitle:'新幹線、超電導磁浮與港區散步', region:'名古屋 → 金城埠頭', icon:TrainFront, note:'搭青波線直達金城埠頭，以鐵道館為主角，下午保留港區散步與名古屋站購物時間。', events:[['09:15','從名古屋站搭青波線前往金城埠頭，車程約 24 分鐘。','train'],['10:00','參觀磁浮鐵道館：歷代新幹線、超電導磁浮、鐵道模型與模擬駕駛展示。','train'],['12:30','館內或 Maker’s Pier 午餐。','food'],['14:00','金城埠頭港區散步，逛 Maker’s Pier；可依體力彈性停留。','walk'],['15:30','搭青波線返回名古屋站。','train'],['16:00 後','JR Gate Tower、Takashimaya、Bic Camera 最後一輪購物，晚餐留在站區。','shop']], tip:'列車駕駛模擬器通常需現場抽選或另行安排。D6 適逢日本國定假日，出發前請再次確認磁浮鐵道館開館資訊與預約規則。' },
  { day:7, date:'1/12（二）', short:'長島＋名花之里', title:'爵士之夢長島＋名花之里', subtitle:'KKday 已購買 · 約 9 小時 30 分鐘', region:'名古屋 → 長島 Outlet → 名花之里 → 名古屋', icon:Bus, note:'跟隨 KKday 行程，白天在爵士之夢長島自由購物，傍晚欣賞名花之里燈光秀。1/12 適用冬季時段，09:45 集合、10:00 出發，午餐自理。', bookingUrl:'https://www.kkday.com/zh-tw/product/701400', events:[['09:45','於 JR 名古屋站前 Mini Stop 名站椿町店便利商店門前集合。','bus'],['10:00','從名古屋出發，適用 10/17–1/31 的出發時段。','bus'],['11:00','三井 OUTLET PARK 爵士之夢長島，自由活動約 4 小時 30 分鐘，午餐自理。','shop','https://www.google.com/maps/search/?api=1&query=35.030174%2C136.7254449&query_place_id=ChIJRZIHWvKEA2ARNqYtMjSNIGA'],['16:00','名花之里燈光秀，停留約 2 小時 30 分鐘。','sparkle','https://www.google.com/maps/search/?api=1&query=35.0825637%2C136.7022588&query_place_id=ChIJ9VpdkviaA2AR2miM56HjIwY'],['18:40','預計回程；實際時間依當天領隊安排，行程順利或路況良好時可能提早返程。','bus'],['19:30','預計抵達名古屋車站，行程結束。','bus']], tip:'行程可能因交通或天候等因素調整，請依導遊指示；回程與抵達時間僅供參考。出發前備妥 KKday 電子憑證。' },
  { day:8, date:'1/13（三）', short:'最後採買＋回程', title:'最後採買＋回機場', subtitle:'19:40 起飛，白天保留從容彈性', region:'名古屋 → 中部國際機場 → 高雄', icon:Luggage, note:'最後一天不排遠程景點，留足時間取行李、移動與完成免稅採買。', events:[['09:00–13:30','早餐、退房後寄放行李；名古屋站周邊最後採買／午餐。','shop'],['14:30–15:15','回飯店取行李，前往名鐵名古屋站；建議約 15:15 左右搭車去機場。','hotel'],['16:00 前後','抵達中部國際機場後前往第二航廈（Terminal 2），預留航廈間移動、報到與購物時間。','train'],['19:40','搭乘 IT269，由名古屋 NGO 返回高雄 KHH，預計 22:35 抵達。','plane']], tip:'回程班機 19:40 起飛，仍建議至少提前 3 小時抵達機場，冬季交通請多留緩衝。' },
]

export default function App() {
  const [selected, setSelected] = useState(0)
  const day = days[selected]

  function selectDay(index) {
    setSelected(index)
    document.getElementById(`date-${index}`)?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
  }

  return <main className="trip-app">
    <header className="app-header">
      <h1>名古屋行程</h1>
      <p>2027 年 1 月 6 日 — 13 日</p>
    </header>

    <details className="subway-map">
      <summary>名古屋地鐵圖 <span>點開查看</span></summary>
      <a href="/nagoya-subway-map.png" target="_blank" rel="noreferrer" aria-label="開啟完整尺寸地鐵圖">
        <img src="/nagoya-subway-map.png" alt="名古屋市交通局官方地鐵圖，含東山線、名城線、名港線、鶴舞線、櫻通線及上飯田線" loading="lazy" width="1413" height="1353" />
      </a>
      <p>點圖可開啟大圖。名鐵與青波線不在這張地鐵圖內。</p>
      <a className="map-source" href="https://map.kotsu.city.nagoya.jp/rp/subway/routemap.html" target="_blank" rel="noreferrer">來源：名古屋市交通局 · 官方路線圖</a>
    </details>

    <nav className="date-picker" aria-label="選擇行程日期">
      {days.map((item, index) => <button
        id={`date-${index}`}
        key={item.day}
        aria-pressed={selected === index}
        aria-label={`${item.date} ${item.title}`}
        className={selected === index ? 'date-button active' : 'date-button'}
        onClick={() => selectDay(index)}
      >
        <span>週{item.date.match(/（(.)）/)[1]}</span>
        <strong>{item.date.split('（')[0]}</strong>
      </button>)}
    </nav>

    <section className="day-content" aria-labelledby="day-title" aria-live="polite">
      <div className="day-heading">
        <p>第 {day.day} 天 · {day.date}</p>
        <h2 id="day-title">{day.title}</h2>
      </div>
      <p className="transport-note">交通以名古屋站附近住宿安排；以下是建議走法，行程時間不是列車發車時刻。</p>
      <ol className="itinerary">
        {day.events.map(([time, label, , mapUrl], index) => <li key={time + label}>
          <span className="event-time">{time}</span>
          <div className="event-content">
            <p>{label}</p>
            {transport[day.day]?.[index] && <p className="transit-directions"><TrainFront size={14} aria-hidden="true" /><span>{transport[day.day][index]}</span></p>}

            {mapUrl && <a href={mapUrl} target="_blank" rel="noreferrer"><MapPin size={14} />查看地圖</a>}
          </div>
        </li>)}
      </ol>
      {day.bookingUrl && <a className="booking-link" href={day.bookingUrl} target="_blank" rel="noreferrer">KKday 行程資訊 <ArrowRight size={14} /></a>}
      <details className="transport-sources">
        <summary>交通資料來源</summary>
        <p>依官方路線整理，查核於 2026/09/19；2027 年 1 月實際班次請於出發前確認。跟團集合資訊沿用你的行程與憑證。</p>
        <a href="https://map.kotsu.city.nagoya.jp/rp/subway/routemap.html" target="_blank" rel="noreferrer">地鐵路線圖</a>
        <a href="https://www.meitetsu.co.jp/train/centrair/guidance/index.html" target="_blank" rel="noreferrer">名鐵機場交通</a>
        <a href="https://www.aonamiline.co.jp/train" target="_blank" rel="noreferrer">青波線</a>
        <a href="https://www.centrair.jp/access/terminal2/" target="_blank" rel="noreferrer">機場 T2 交通</a>
        <a href="https://inuyama.gr.jp/access" target="_blank" rel="noreferrer">犬山交通</a>
        <a href="https://www.nagoyajo.city.nagoya.jp/" target="_blank" rel="noreferrer">名古屋城交通</a>
      </details>
    </section>

    <footer className="day-navigation">
      <button disabled={selected === 0} onClick={() => selectDay(selected - 1)}><ArrowLeft size={16} />前一天</button>
      <span>{day.day} / {days.length}</span>
      <button disabled={selected === days.length - 1} onClick={() => selectDay(selected + 1)}>後一天<ArrowRight size={16} /></button>
    </footer>
  </main>
}
