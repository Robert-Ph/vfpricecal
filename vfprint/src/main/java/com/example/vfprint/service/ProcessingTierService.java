package com.example.vfprint.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.dto.request.ProcessingTierRequest;
import com.example.vfprint.entity.Processing;
import com.example.vfprint.entity.ProcessingTier;
import com.example.vfprint.repository.ProcessingTierRepository;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProcessingTierService {
    
    private final ProcessingTierRepository repository;

    @Transactional
    public void createProcessingTierList(List<ProcessingTierRequest> request, Processing processing){
        List<ProcessingTier> rList = request.stream()
                    .map(item -> ProcessingTier.builder()
                                .processing(processing)
                                .minVolume(item.getMinVolume())
                                .maxVolume(item.getMaxVolume())
                                .minCharge(item.getMinCharge())
                                .price(item.getPrice())
                                .isActive(true)
                                .createAt(Timestamp.valueOf(LocalDateTime.now()))
                                .build()
                ).toList();     
                
        repository.saveAll(rList);
    }

    @Transactional
    public List<ProcessingTier> getAllByProcessingId(Processing processing){
        return repository.findByProcessing(processing);
    }

    @Transactional
    public void updateProcessingTier(List<ProcessingTierRequest> requests, Processing processing){
        List<ProcessingTier> list = repository.findByProcessing(processing);
        Set<UUID> resultIds = requests.stream()
                                .map(ProcessingTierRequest::getId)
                                .filter(Objects::nonNull)
                                .collect(Collectors.toSet());
        
        List<ProcessingTier> deleteList = list.stream()
                                        .filter(tier  -> !resultIds.contains(tier.getId()))
                                        .toList();
        
        repository.deleteAll(deleteList);

            List<ProcessingTier> saveList = requests.stream()
            .map(item -> {
                ProcessingTier tier;

                if (item.getId() != null) {
                    tier = repository.findById(item.getId())
                            .orElseThrow();
                } else {
                    tier = new ProcessingTier();
                    tier.setCreateAt(
                            Timestamp.valueOf(LocalDateTime.now()));
                    tier.setActive(true);
                }

                tier.setProcessing(processing);
                tier.setMinVolume(item.getMinVolume());
                tier.setMaxVolume(item.getMaxVolume());
                tier.setPrice(item.getPrice());
                tier.setMinCharge(item.getMinCharge());

                return tier;
            })
            .toList();

            repository.saveAll(saveList);
    }
}
