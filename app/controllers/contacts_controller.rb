class ContactsController < ApplicationController
  # GET /contacts
  # GET /contacts.json
  def index
    @contacts = Contact.all

    render json: @contacts
  end

  # GET /contacts/1
  # GET /contacts/1.json
  def show
    @contact = Contact.find(params[:id])

    render json: @contact
  end

  # POST /contacts
  # POST /contacts.json
  def create
    contact = Contact.create(contact_params)

    if contact.new_record?
      render json: { errors: contact.errors.messages }, status: 422
    else
      render json: contact, status: 201
    end
  end

  # PATCH/PUT /contacts/1
  # PATCH/PUT /contacts/1.json
  def update
    @contact = Contact.find(params[:id])

    if @contact.update(contact_params)
      head :no_content
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  # DELETE /contacts/1
  # DELETE /contacts/1.json
  def destroy
    @contact = Contact.find(params[:id])
    @contact.destroy

    head :no_content
  end

  # Strong Parameters (Rails 4)
  def contact_params
    params.require(:contact).permit(:name, :email, :phone)
  end

end
