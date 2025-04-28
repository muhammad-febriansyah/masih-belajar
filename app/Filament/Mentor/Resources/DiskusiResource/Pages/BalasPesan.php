<?php

namespace App\Filament\Mentor\Resources\DiskusiResource\Pages;

use App\Filament\Mentor\Resources\DiskusiResource;
use App\Models\BalasDiskusi;
use App\Models\Diskusi;
use Filament\Actions\Action;
use Filament\Actions\Concerns\InteractsWithRecord;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\Page;
use Illuminate\Support\Facades\Auth;

class BalasPesan extends Page implements HasForms
{
    use InteractsWithForms;
    public ?array $data = [];
    public ?Diskusi $record = null;
    protected static string $resource = DiskusiResource::class;

    protected static string $view = 'filament.mentor.resources.diskusi-resource.pages.balas-pesan';

    public function mount(Diskusi $record)
    {
        $this->record = $record;
        $this->form->fill();
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make()->schema([
                    Textarea::make('body')
                        ->required(),
                ])
            ])
            ->statePath('data');
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label(__('filament-panels::resources/pages/edit-record.form.actions.save.label'))
                ->submit('save')->label('Simpan')->icon('heroicon-o-check-circle'),
        ];
    }


    public function save()
    {
        $data = $this->form->getState();
        $q = new BalasDiskusi();
        $q->user_id = Auth::user()->id;
        $q->diskusi_id = $this->record->id;
        $q->body = $data['body'];
        $q->save();

        Notification::make()
            ->success()
            ->title('Data berhasil disimpan')
            ->send();

        return $this->redirect('/mentor/diskusis', navigate: true);
    }
}
