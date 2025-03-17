const Contacts = {
    template: `
        <div class="contacts-container">
            <div class="contacts-grid">
                <div class="info-grid">
                    <div class="info-card">
                        <h3>Address</h3>
                        <div class="address-content">
                            <p>Arhitekti tn 10, 50407 Tartu, Estonia</p>
                            <p>Medical Center "MetaLaboratory"</p>
                            <p class="metro"><i class="fas fa-subway"></i> 5 minutes from the city center</p>
                            <div class="transport-info">
                                <div class="transport-item">
                                    <i class="fas fa-walking"></i>
                                    <span>From city center: 5-7 minutes walk along the University street</span>
                                </div>
                                <div class="transport-item">
                                    <i class="fas fa-bus"></i>
                                    <span>Buses: 15, 24, 85 (stop "Arhitekti")</span>
                                </div>
                                <div class="transport-item">
                                    <i class="fas fa-car"></i>
                                    <span>Personal transport: free parking on the center's territory</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="info-card">
                        <h3>Phone Numbers</h3>
                        <div class="contact-content">
                            <div class="contact-item">
                                <a href="tel:+3725123456">+372 512 3456</a>
                                <span>General questions and consultations</span>
                                <p class="contact-details">We will answer all questions about our services, prices and promotions. We will help you choose a convenient time for a visit.</p>
                            </div>
                            <div class="contact-item">
                                <a href="tel:+3725123457">+372 512 3457</a>
                                <span>Appointment for tests and studies</span>
                                <p class="contact-details">Schedule appointments for all types of laboratory tests, including urgent analyses and comprehensive diagnostics.</p>
                            </div>
                        </div>
                    </div>

                    <div class="info-card">
                        <h3>Email</h3>
                        <div class="contact-content">
                            <div class="contact-item">
                                <a href="mailto:info@metalab.ee">info@metalab.ee</a>
                                <span>General questions and information</span>
                                <p class="contact-details">Send us an email for detailed information about our services, corporate service or cooperation.</p>
                            </div>
                            <div class="contact-item">
                                <a href="mailto:support@metalab.ee">support@metalab.ee</a>
                                <span>Technical support</span>
                                <p class="contact-details">Solutions for issues with your personal account, receiving results online, and website functionality.</p>
                            </div>
                        </div>
                    </div>

                    <div class="info-card">
                        <h3>Working Hours</h3>
                        <div class="schedule-content">
                            <div class="schedule-item">
                                <span class="day">Mon-Fri:</span>
                                <span class="time">8:00 - 20:00</span>
                            </div>
                            <div class="schedule-item">
                                <span class="day">Sat:</span>
                                <span class="time">9:00 - 18:00</span>
                            </div>
                            <div class="schedule-item">
                                <span class="day">Sun:</span>
                                <span class="time">9:00 - 16:00</span>
                            </div>
                            <div class="schedule-note">
                                <p>Test collection: daily from 8:00 to 11:00</p>
                                <p>Urgent tests: throughout the working day</p>
                                <p>Results available: 24/7 in your personal account</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="map-section">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2092.347992602746!2d26.678260577264577!3d58.37066788738478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eb3708ae89c8c5%3A0x9ee86db8e6696d74!2sArhitekti%20tn%2010%2C%2050407%20Tartu!5e0!3m2!1set!2see!4v1739274113884!5m2!1set!2see" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </div>
    `
};
