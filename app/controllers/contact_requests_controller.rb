class ContactRequestsController < ApplicationController
  # GET /contacts
  # GET /contacts.json
  def index
    @contact_requests = ContactRequest.all

    render json: @contact_requests
  end

  # GET /contacts/1
  # GET /contacts/1.json
  def show
    @contact_request = ContactRequest.find(params[:id])

    render json: @contact_request
  end

  # POST /contacts
  # POST /contacts.json
  def create
    contact_request = ContactRequest.create(contact_request_params)

    if contact_request.new_record?
      render json: { errors: contact_request.errors.messages }, status: 422
    else
      render json: contact_request, status: 201
    end
  end

  # PATCH/PUT /contacts/1
  # PATCH/PUT /contacts/1.json
  def update
    @contact_request = ContactRequest.find(params[:id])

    if @contact_request.update(contact_request_params)
      head :no_content
    else
      render json: @contact_request.errors, status: :unprocessable_entity
    end
  end

  # DELETE /contacts/1
  # DELETE /contacts/1.json
  def destroy
    @contact_request = ContactRequest.find(params[:id])
    @contact_request.destroy

    head :no_content
  end

  # Strong Parameters (Rails 4)
  def contact_request_params
    params.require(:contact_request).permit(:name, :email, :phone, :message, :contact_method)
  end

end
