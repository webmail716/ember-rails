SimpleAuth::Application.routes.draw do
  resources :contact_requests, except: [:new, :edit]
  namespace :admin do resources :units, except: [:new, :edit] end
  resources :contacts, except: [:new, :edit]
  resources :units, except: [:new, :edit]
  resources :addresses, except: [:new, :edit]
  resources :properties #, except: [:new, :edit]
  resources :users, except: [:new, :edit, :destroy]
  resources :pages
  resources :images
  
  post 'session' => 'session#create'
end
