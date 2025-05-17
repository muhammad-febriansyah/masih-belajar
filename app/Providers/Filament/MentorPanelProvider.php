<?php

namespace App\Providers\Filament;

use App\Filament\Widgets\JmlTrxChart;
use App\Filament\Widgets\StatsOverview;
use App\Filament\Widgets\TotalTrxChart;
use App\Models\Setting;
use Filament\FontProviders\GoogleFontProvider;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class MentorPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        $setting = Setting::first();
        return $panel
            ->id('mentor')
            ->path('mentor')
            ->login()
            ->brandName($setting->site_name)
            ->globalSearch(true)
            ->spa()
            ->sidebarCollapsibleOnDesktop(true)
            ->breadcrumbs(true)
            ->sidebarWidth('15rem')
            ->globalSearchKeyBindings(['command+k', 'ctrl+k'])
            ->favicon(asset('storage/' . $setting->logo))
            ->brandLogo(asset('storage/' . $setting->long_logo))
            ->brandLogoHeight('5rem')
            ->font('Poppins', provider: GoogleFontProvider::class)
            ->colors([
                'primary' => '#207A36',
            ])
            ->discoverResources(in: app_path('Filament/Mentor/Resources'), for: 'App\\Filament\\Mentor\\Resources')
            ->discoverPages(in: app_path('Filament/Mentor/Pages'), for: 'App\\Filament\\Mentor\\Pages')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Mentor/Widgets'), for: 'App\\Filament\\Mentor\\Widgets')
            ->widgets([
                Widgets\AccountWidget::class,
                StatsOverview::class,
                TotalTrxChart::class,
                JmlTrxChart::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->viteTheme('resources/css/filament/admin/theme.css')
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
