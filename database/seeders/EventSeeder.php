<?php

namespace Database\Seeders;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'user_id' => 1,
                'title' => 'Workshop Laravel untuk Pemula',
                'slug' => 'workshop-laravel-untuk-pemula',
                'tgl' => Carbon::now()->addDays(15)->toDateString(),
                'desc' => '<p>Workshop komprehensif tentang dasar-dasar Laravel framework. Peserta akan belajar tentang routing, controller, model, view, dan fitur-fitur dasar Laravel lainnya. Cocok untuk developer yang baru memulai dengan Laravel.</p><ul><li>Pengenalan Laravel dan instalasi</li><li>Routing dan Controller</li><li>Eloquent ORM</li><li>Blade Templates</li><li>Authentication</li></ul>',
                'image' => 'events/laravel-workshop.jpg',
                'views' => 245,
                'created_at' => Carbon::now()->subDays(10),
                'updated_at' => Carbon::now()->subDays(5),
            ],
            [
                'user_id' => 2,
                'title' => 'Seminar Teknologi AI dan Machine Learning',
                'slug' => 'seminar-teknologi-ai-dan-machine-learning',
                'tgl' => Carbon::now()->addDays(30)->toDateString(),
                'desc' => '<p>Seminar nasional tentang perkembangan terkini dalam bidang Artificial Intelligence dan Machine Learning. Pembicara expert dari berbagai universitas dan perusahaan teknologi terkemuka.</p><p><strong>Topik yang akan dibahas:</strong></p><ul><li>Deep Learning dan Neural Networks</li><li>Natural Language Processing</li><li>Computer Vision</li><li>AI Ethics dan Responsible AI</li></ul>',
                'image' => 'events/ai-seminar.jpg',
                'views' => 892,
                'created_at' => Carbon::now()->subDays(20),
                'updated_at' => Carbon::now()->subDays(3),
            ],
            [
                'user_id' => 1,
                'title' => 'Bootcamp Full Stack Web Development',
                'slug' => 'bootcamp-full-stack-web-development',
                'tgl' => Carbon::now()->addDays(45)->toDateString(),
                'desc' => '<p>Bootcamp intensif 3 bulan untuk mempelajari full stack web development dari nol hingga mahir. Program ini mencakup frontend, backend, dan database management.</p><p><strong>Tech Stack yang dipelajari:</strong></p><ul><li>HTML, CSS, JavaScript</li><li>React.js atau Vue.js</li><li>Node.js dan Express</li><li>PHP dan Laravel</li><li>MySQL dan MongoDB</li><li>Git dan Deployment</li></ul>',
                'image' => 'events/fullstack-bootcamp.jpg',
                'views' => 1203,
                'created_at' => Carbon::now()->subDays(25),
                'updated_at' => Carbon::now()->subDays(1),
            ],
            [
                'user_id' => 3,
                'title' => 'Conference Cybersecurity Indonesia 2025',
                'slug' => 'conference-cybersecurity-indonesia-2025',
                'tgl' => Carbon::now()->subDays(5)->toDateString(),
                'desc' => '<p>Konferensi tahunan cybersecurity terbesar di Indonesia. Menghadirkan expert keamanan siber dari dalam dan luar negeri untuk membahas tren terkini dalam cybersecurity.</p><p><strong>Agenda Utama:</strong></p><ul><li>Threat Intelligence dan Incident Response</li><li>Cloud Security Best Practices</li><li>IoT Security Challenges</li><li>Penetration Testing Workshop</li><li>Digital Forensics</li></ul>',
                'image' => 'events/cybersecurity-conference.jpg',
                'views' => 567,
                'created_at' => Carbon::now()->subDays(45),
                'updated_at' => Carbon::now()->subDays(7),
            ],
            [
                'user_id' => 2,
                'title' => 'Hackathon Mobile App Development',
                'slug' => 'hackathon-mobile-app-development',
                'tgl' => Carbon::now()->addDays(7)->toDateString(),
                'desc' => '<p>Kompetisi pengembangan aplikasi mobile dalam waktu 48 jam. Peserta akan berkompetisi untuk menciptakan aplikasi mobile yang inovatif dan bermanfaat untuk masyarakat.</p><p><strong>Kategori Lomba:</strong></p><ul><li>Best Innovation</li><li>Best UI/UX Design</li><li>Best Technical Implementation</li><li>People\'s Choice Award</li></ul><p><strong>Hadiah Total:</strong> Rp 50.000.000</p>',
                'image' => 'events/mobile-hackathon.jpg',
                'views' => 1456,
                'created_at' => Carbon::now()->subDays(30),
                'updated_at' => Carbon::now()->subDays(2),
            ],
        ];

        foreach ($events as $event) {
            Event::create($event);
        }
    }
}
