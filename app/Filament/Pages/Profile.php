<?php

namespace App\Filament\Pages;

use App\Models\Section;
use App\Models\User;
use Filament\Actions\Action;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section as ComponentsSection;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class Profile extends Page implements HasForms
{
    use InteractsWithForms;
    public ?array $data = [];
    public User $user;
    protected static ?string $navigationIcon = 'heroicon-o-user-circle';

    protected static string $view = 'filament.pages.profile';
    protected static ?string $navigationGroup = 'Setting';
    protected static ?string $navigationLabel = 'My Profile';
    protected static ?int $navigationSort = 9;


    public function mount(): void
    {
        $this->user = User::findOrFail(auth()->user()->id);
        $this->form->fill($this->user->toArray());
    }

    public  function form(Form $form): Form
    {
        return $form
            ->schema([
                ComponentsSection::make([
                    TextInput::make('name')
                        ->label('Nama')
                        ->placeholder('Nama Lengkap'),
                    TextInput::make('email')
                        ->label('Email')
                        ->placeholder('Email'),
                    TextInput::make('password')
                        ->password()
                        ->label('Password')
                        ->revealable()
                        ->minLength(3)
                        ->dehydrated(fn($state) => filled($state))->nullable()
                        ->placeholder('Password'),
                    TextInput::make('tempat_lahir')
                        ->label('Tempat Lahir')
                        ->placeholder('Tempat Lahir'),
                    DatePicker::make('tanggal_lahir')
                        ->native(false)
                        ->label('Tanggal Lahir')
                        ->placeholder('Tanggal Lahir'),
                    TextInput::make('umur')
                        ->label('Umur')
                        ->suffix('Tahun')
                        ->placeholder('Umur'),
                    TextInput::make('phone')
                        ->label('Nomor Telepon')
                        ->numeric()
                        ->placeholder('Nomor Telepon'),
                    TextInput::make('alamat')
                        ->label('Alamat')
                        ->placeholder('Alamat'),
                    Select::make('jk')
                        ->label('Jenis Kelamin')
                        ->options(['Laki-laki' => 'Laki-laki', 'Perempuan' => 'Perempuan'])->columnSpan(['lg' => 2, 'md' => 1, 'sm' => 1]),
                ])
                    ->columnSpan(['lg' => 2, 'md' => 1, 'sm' => 1])
                    ->columns(['lg' => 2, 'md' => 1, 'sm' => 1]),
                ComponentsSection::make([
                    FileUpload::make('image')
                        ->disk('public')
                        ->directory('image-upload-server')
                        ->label('Avatar')
                        ->maxSize(3072)
                        ->image()
                        ->avatar()
                        ->deletable(true)
                        ->deleteUploadedFileUsing(function ($record, $file) {
                            if (isset($record->image) && $record->image == $file) {
                                if (File::exists(public_path('storage/' . $record->image))) {
                                    File::delete(public_path('storage/' . $record->image));
                                }
                            }
                        })
                        ->alignCenter()
                        ->columns(1),
                ])
                    ->columnSpan(['lg' => 1, 'md' => 1, 'sm' => 1]),
                ComponentsSection::make([
                    RichEditor::make('bio')->label('Biografi')
                ])
                    ->columnSpan(['lg' => 3, 'md' => 1, 'sm' => 1]),


            ])
            ->columns(['lg' => 3, 'md' => 3, 'sm' => 3])->statePath('data');
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label(__('filament-panels::resources/pages/edit-record.form.actions.save.label'))
                ->submit('Simpan')->icon('heroicon-o-check-circle'),
        ];
    }

    public function save()
    {
        try {
            // Get form state
            $data = $this->form->getState();

            // Assuming you're updating a User model (you can change this to the appropriate model)
            $user = User::findOrFail(auth()->id());  // Or fetch the user based on a given ID

            // Check if avatar/image is being updated
            if (isset($data['image']) && $data['image'] !== $user->image) {
                // Delete old avatar if exists
                if ($user->image) {
                    $oldImagePath = public_path('storage/' . $user->image);
                    if (File::exists($oldImagePath)) {
                        File::delete($oldImagePath);
                    }
                }

                // Set the new avatar image path
            }

            // Check if password is being updated
            if (isset($data['password']) && $data['password']) {
                // Hash the password if it is provided
                $data['password'] = Hash::make($data['password']);
                return $this->redirect('/admin/profile', navigate: true);
            } else {
                // Remove password field from data if it's empty
                unset($data['password']);
            }

            // Update only the fields that are provided (partial update)
            $user->update($data);
            Auth::login($user);
            // Send success notification
            Notification::make()
                ->success()
                ->title('Data berhasil disimpan')
                ->send();

            // Redirect to the desired page after saving
            return $this->redirect('/admin/profile', navigate: true);
        } catch (\Exception $exception) {
            // In case of an error, show warning notification
            Notification::make()
                ->warning()
                ->title('Terjadi kesalahan: ' . $exception->getMessage())
                ->send();

            // Redirect back after failure
            return $this->redirect('/admin/profile', navigate: true);
        }
    }
}
