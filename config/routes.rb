SimpleAuth::Application.routes.draw do
  resources :contacts, except: [:new, :edit]
  resources :units, except: [:new, :edit]
  resources :addresses, except: [:new, :edit]
  resources :properties, except: [:new, :edit]
  resources :users, except: [:new, :edit, :destroy]
  post 'session' => 'session#create'
end
