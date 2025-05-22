<?php

namespace App\Filament\Pages;

use App\Models\TermCondition as ModelsTermCondition;
use Filament\Actions\Action;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class TermCondition extends Page implements HasForms
{
    use InteractsWithForms;
    public ?array $data = [];
    public ModelsTermCondition $setting;
    public $settings;
    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-list';

    protected static string $view = 'filament.pages.term-condition';
    protected static ?string $navigationGroup = 'Setting';
    protected static ?string $navigationLabel = 'Syarat dan Ketentuan';
    protected static ?int $navigationSort = 9;

    public function mount(): void
    {
        $this->setting = ModelsTermCondition::first();
        $this->form->fill($this->setting->toArray());
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make()
                    ->schema([
                        RichEditor::make('body')->label('Syarat dan Ketentuan'),
                    ]),
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
        try {
            $data = $this->form->getState();
            $q = ModelsTermCondition::findOrFail(1);  // Assuming you're updating the first setting

            // Update only the fields that are provided (partial update)
            $q->update($data);

            Notification::make()
                ->success()
                ->title('Data berhasil disimpan')
                ->send();

            return $this->redirect('/admin/term-condition', navigate: true);
        } catch (\Exception $exception) {
            Notification::make()
                ->warning()
                ->title($exception->getMessage())
                ->send();

            return $this->redirect('/admin/term-condition', navigate: true);
        }
    }
}
